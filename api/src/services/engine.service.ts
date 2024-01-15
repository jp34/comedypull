import Env from "../config/env";
import logger from "../config/logger";
import {
    UpdateStatus,
    TMAct,
    TMShow,
    TMVenue,
    ActModel,
    VenueModel,
    ShowModel
} from "../domain";
import { fetchActs, fetchShowsByActId } from "./tm.service";
import { AnyBulkWriteOperation, BulkWriteResult } from "mongodb";
import { v4 } from "uuid";

type IDRef = {
    _id: string;
    id: string;
}

type WriteResult = {
    batch: string;
    result: BulkWriteResult;
}

/**
 * Maps an array of TM objects to an array of upsert write operations. Works for any
 * object whose type inherits from TM.
 * 
 * @param docs Objects to map to write operations
 * @returns An array of write operations
 */
const buildUpsertWriteOperations = (docs: Array<any>): Array<AnyBulkWriteOperation> => {
    return docs.map((d: any) => ({
        updateOne: {
            filter: { id: d.id },
            update: d,
            upsert: true
        }
    }))
}

/**
 * Bulk writes an array of TMShow objects with upsert. Will update or insert one Act entity for
 * each TMAct object. Applies a version id, and relevance rank to each object before upsert.
 * 
 * @param shows TMShow objects to upsert
 * @param version Version id to be applied to each object
 * @returns BulkWriteResult
 */
const bulkWriteActs = async (acts: Array<TMAct>, version: string): Promise<WriteResult> => {
    // Generate batch id
    const batch: string = v4();
    // Generate write operations and apply version id + relevance rank
    const writeOps: Array<AnyBulkWriteOperation> = buildUpsertWriteOperations(
        acts.map((a: TMAct, index: number) => ({ ...a, version, batch, relevance: (index + 1)}))
    );
    // Bulk write acts to database
    const result: BulkWriteResult = await ActModel.bulkWrite(writeOps);
    return { batch, result };
}

/**
 * Bulk writes an array of TMShow objects with upsert. Will update or insert one Venue entity for
 * each TMVenue object. Applies a version id to each object before upsert.
 * 
 * @param venues TMVenue objects to upsert
 * @param version Version id to be applied to each object
 * @returns BulkWriteResult
 */
const bulkWriteVenues = async (venues: Array<TMVenue>, version: string): Promise<WriteResult> => {
    // Generate batch id
    const batch: string = v4();
    // Generate write operations and apply version id
    const writeOps: Array<AnyBulkWriteOperation> = buildUpsertWriteOperations(
        venues.map((v: TMVenue) => ({ ...v, version, batch }))
    );
    // Bulk write venues to databse
    const result: BulkWriteResult = await VenueModel.bulkWrite(writeOps);
    return { batch, result };
}

/**
 * Bulk writes an array of TMShow objects with upsert. Will update or insert one Show entity for
 * each TMShow object. Applies a version id to each object before upsert.
 * 
 * @param shows TMShow objects to upsert
 * @param version Version id to be applied to each object
 * @returns BulkWriteResult
 */
const bulkWriteShows = async (shows: Array<TMShow>, version: string): Promise<WriteResult> => {
    // Generate batch id
    const batch: string = v4();
    // Generate write operations and apply version id
    const writeOps: Array<AnyBulkWriteOperation> = buildUpsertWriteOperations(
        shows.map((s: TMShow) => ({ ...s, version, batch }))
    );
    // Bulk write shows to databse
    const result: BulkWriteResult = await ShowModel.bulkWrite(writeOps);
    return { batch, result };
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
        const venueResult: WriteResult = await bulkWriteVenues(venues, version);
        const venueBatch: Array<IDRef> = await VenueModel
            .find({ batch: venueResult.batch }, { _id: 1, id: 1 })
            .limit(100)
            .skip(0)
            .lean();

        // Apply show references to related act and venue
        shows.forEach((s: TMShow) => {
            // Lookup correct venue object id
            const venueRef: IDRef | undefined = venueBatch.find((v: IDRef) => (s.venue === v.id));
            if (!venueRef) logger.warn(`Failed to lookup venue:${s.venue} for show:${s.id}`);
            // Replace s.venue with the venues object id
            else s.venue = venueRef._id;
            // Replace s.act with the acts object id
            s.act = act._id;
        });

        // Insert shows into database
        const showResult: WriteResult = await bulkWriteShows(shows, version);

        result.venueCount = (venueResult.result.modifiedCount + venueResult.result.insertedCount);
        result.showCount = (showResult.result.modifiedCount + showResult.result.insertedCount);
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
        const actResult: WriteResult = await bulkWriteActs(tmActs, version);
        const actBatch: Array<IDRef> = await ActModel
            .find({ batch: actResult.batch }, { _id: 1, id: 1 })
            .limit(100)
            .skip(0)
            .lean();

            // For each newly inserted act, fetch and update shows + venues
            actBatch.forEach(async (a: IDRef, index: number) => {

            // Update shows and venues
            const result: EntryUpdateResult = await updateDatabaseEntry(a, version, {
                currentAttempts: 0,
                maxAttempts: Env.ENGINE_RETRY_LIMIT
            });
            
            // Check if process failed
            if (result.status !== UpdateStatus.DONE)
                logger.warn(`Failed to insert data for act:${a.id} after ${result.attempts} attempts`);
            // Check if process is done
            if (index == actBatch.length - 1) {
                logger.info(`Database update finished`);
            }
        });
    } catch (err: any) {
        logger.error("Database update failed", { version, cause: err.message, stack: err.stack });
        logger.error(err.stack);
    }
}
