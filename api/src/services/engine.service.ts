import Env from "../config/env";
import logger from "../config/logger";
import {
    UpdateStatus,
    TM,
    TMAct,
    TMShow,
    TMVenue,
    ActModel,
    VenueModel,
    ShowModel
} from "../domain";
import { fetchActs, fetchShowsByActId } from "./tm.service";
import { AnyBulkWriteOperation } from "mongodb";
import { v4 } from "uuid";

interface IDRef {
    _id: string;
    id: string;
}

/**
 * Maps an array of TM objects to an array of upsert write operations. Works for any
 * object whose type inherits from TM.
 * 
 * @param docs Objects to map to write operations
 * @returns An array of write operations
 */
const buildUpsertWriteOperations = (docs: Array<TM>): Array<AnyBulkWriteOperation> => {
    return docs.map((d: TM) => ({
        updateOne: {
            filter: { id: d.id },
            update: d,
            upsert: true
        }
    }))
}

/**
 * Upserts and returns an array of TMAct objects. Will update or insert one Act entity for
 * each TMAct object. Applies a version id, and relevance rank to each object before upsert.
 * 
 * @param shows TMShow objects to upsert
 * @param version Version id to be applied to each object
 * @returns An array of IDRef objects (_id, id)
 */
const updateActs = async (acts: Array<TMAct>, version: string): Promise<Array<IDRef>> => {
    // Generate write operations and apply version id + relevance rank
    const writeOps: Array<AnyBulkWriteOperation> = buildUpsertWriteOperations(
        acts.map((a: TMAct, index: number) => ({ ...a, version, relevance: (index + 1)}))
    );
    // Bulk write acts to database
    await ActModel.bulkWrite(writeOps);
    // Fetch IDRef's for newly inserted acts
    return await ActModel.find({ version })
        .select(['_id', 'id'])
        .limit(writeOps.length)
        .skip(0)
        .lean();
}

/**
 * Upserts and returns an array of TMVenue objects. Will update or insert one Venue entity for
 * each TMVenue object. Applies a version id to each object before upsert.
 * 
 * @param venues TMVenue objects to upsert
 * @param version Version id to be applied to each object
 * @returns An array of IDRef objects (_id, id)
 */
const updateVenues = async (venues: Array<TMVenue>, version: string): Promise<Array<IDRef>> => {
    // Generate write operations and apply version id
    const writeOps: Array<AnyBulkWriteOperation> = buildUpsertWriteOperations(
        venues.map((v: TMVenue) => ({ ...v, version }))
    );
    // Bulk write venues to databse
    await VenueModel.bulkWrite(writeOps);
    // Fetch IDRef's for newly inserted venues
    return await VenueModel.find({ version })
        .select(['_id', 'id'])
        .limit(writeOps.length)
        .skip(0)
        .lean();
}

/**
 * Upserts and returns an array of TMShow objects. Will update or insert one Show entity for
 * each TMShow object. Applies a version id to each object before upsert.
 * 
 * @param shows TMShow objects to upsert
 * @param version Version id to be applied to each object
 * @returns An array of IDRef objects (_id, id)
 */
const updateShows = async (shows: Array<TMShow>, version: string): Promise<Array<IDRef>> => {
    // Generate write operations and apply version id
    const writeOps: Array<AnyBulkWriteOperation> = buildUpsertWriteOperations(
        shows.map((s: TMShow) => ({ ...s, version }))
    );
    // Bulk write shows to databse
    await ShowModel.bulkWrite(writeOps);
    // Fetch IDRef's for newly inserted shows
    return await ShowModel.find({ version })
        .select(['_id', 'id'])
        .limit(writeOps.length)
        .skip(0)
        .lean();
}

type EntryUpdateConfig = {
    maxAttempts: number;
    currentAttempts: number;
};

type EntryUpdateResult = {
    status: UpdateStatus;
    attempts: number;
    showCount: number;
    venueCount: number;
};

const updateDatabaseEntry = async (act: IDRef, version: string, config: EntryUpdateConfig): Promise<EntryUpdateResult> => {
    config.currentAttempts++;
    var result: EntryUpdateResult = { status: UpdateStatus.STARTED, attempts: config.currentAttempts, showCount: 0, venueCount: 0 }
    try {
        // Fetch shows for given entry
        const pairs: Array<[TMShow, TMVenue]> = await fetchShowsByActId(act.id);
        // Parse shows and venues
        const shows: Array<TMShow> = pairs.map((p: [TMShow, TMVenue]) => p[0]);
        const venues: Array<TMVenue> = pairs.map((p: [TMShow, TMVenue]) => p[1]);

        // Insert venues into database
        const insertedVenues: Array<IDRef> = await updateVenues(venues, version);

        // Apply show references to related act and venue
        shows.forEach((s: TMShow) => {
            // Lookup correct venue object id
            const venueRef: IDRef | undefined = insertedVenues.find((ref: IDRef) => (s.venue == ref.id));
            if (!venueRef) throw new Error(`Failed to map venue.id to venue._id for act:${act.id} and venue:${s.venue}`);
            // Replace s.venue with the venues object id
            s.venue = venueRef._id;
            // Replace s.act with the acts object id
            s.act = act._id;
        });

        // Insert shows into database
        const insertedShows: Array<IDRef> = await updateShows(shows, version);

        result.venueCount = insertedVenues.length;
        result.showCount = insertedShows.length;
        result.status = UpdateStatus.DONE;
        logger.info(`Inserted data for act:${act.id}`, { act, version });
    } catch (err: any) {
        result.status = UpdateStatus.FAILED;
        logger.error(`Failed to insert data for act:${act.id}`, { act, version, cause: err.message, stack: err.stack });
        logger.error(err.stack);
    }

    // Check if update failed. If failed try again, otherwise return result
    if (
        (result.status === UpdateStatus.FAILED) &&
        (config.currentAttempts < config.maxAttempts)
    )
        return updateDatabaseEntry(act, version, config);
    else
        return result;
}

/**
 * Performs a complete database update from Ticketmaster. Will insert a new batch of acts, shows, and venues
 * into the database. Each batch can be identified by a unique version uuid. Utilizes updateDatabaseEntry() to
 * implement update algorithm.
 * 
 * Update performed by implementing the following basic algorithm:
 * 
 *          let N = No. of acts to fetch from ticketmaster
 * 
 *              **NOTE** - N will also impact the number of shows and venues
 *              inserted into the database.
 * 
 *          let X = No. of shows to fetch for each act
 * 
 *              **NOTE** - Ticketmaster returns shows and venues together. Each
 *              response from the ticketmaster /events endpoint will return one
 *              show and one venue. 
 * 
 *          1. Fetch N acts from Ticketmaster
 *          2. Insert N acts into database
 *          3. Fetch inserted act IDRef's (_id, id)
 *          4. For each act id
 *              1. Fetch X shows for act id
 *              2. Parse Shows, Venues
 *              3. Insert venues into database
 *              4. Fetch inserted venue IDRef's (_id, id)
 *              5. For Each show id
 *                  1. Set show.act equal to Act's object id (_id)
 *                  2. Lookup Venue's object id from list of venue ref's
 *                  3. Set show.venue equal to Venue's object id (_id)
 *              6. Insert shows into database
 *              7. Fetch inserted show IDRef's (_id, id)
 *              8. Report results of update
 */
export const updateDatabase = async (): Promise<void> => {
    const version: string = v4();
    logger.info("Database update started", { version });
    try {
        // Fetch top acts from Ticketmaster
        const tmActs: Array<TMAct> = await fetchActs(Env.TM_ACT_LIMIT, 0);
        const insertedActs: Array<IDRef> = await updateActs(tmActs, version);
        
            // For each newly inserted act, fetch and update shows + venues
        insertedActs.forEach(async (a: IDRef, index: number) => {

            // Update shows and venues
            const result: EntryUpdateResult = await updateDatabaseEntry(a, version, {
                currentAttempts: 0,
                maxAttempts: Env.ENGINE_RETRY_LIMIT
            });
            
            // Check if process failed
            if (result.status !== UpdateStatus.DONE)
                logger.warn(`Failed to insert data for act:${a.id} after ${result.attempts} attempts`);
            // Check if process is done
            if (index == insertedActs.length - 1) {
                logger.info(`Database update finished`);
            }
        });
    } catch (err: any) {
        logger.error("Database update failed", { version, cause: err.message, stack: err.stack });
        logger.error(err.stack);
    }
}
