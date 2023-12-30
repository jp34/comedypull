import Env from "../../../config/env";
import logger from "../../../config/logger";
import {
    Act,
    UpdateStatus,
    TMAct,
    TMShow,
    TMVenue,
    ActDTO,
    mapToAct,
    mapToShow,
    mapToVenue
} from "../domain";
import { fetchActs, fetchShowsByActId } from "./tm.service";
import { upsertActs, findManyActs } from "./act.service";
import { upsertVenues } from "./venue.service";
import { upsertShows } from "./show.service";
import { BulkWriteResult } from "mongodb";
import { v4 } from "uuid";
import { createUpdate, setUpdateStatus } from "./update.service";

type DatabaseUpdateResult = {
    status: UpdateStatus,
    actCount: number;
    showCount: number;
    venueCount: number;
};

export const updateDatabase = async (): Promise<void> => {
    const updateId: string = v4();
    var updateResult: DatabaseUpdateResult = { status: UpdateStatus.STARTED, actCount: 0, showCount: 0, venueCount: 0 };    
    await createUpdate(updateId);
    logger.info("Database update started", { updateId });
    try {
        const tmActs: Array<TMAct> = await fetchActs(Env.TM_ACT_LIMIT, 0);              // Fetch top acts from Ticketmaster
        logger.info(tmActs.length);
        const acts: Array<Act> = tmActs.map((a: TMAct, index: number) => mapToAct(a, (index + 1), updateId));       // Map from TMAct to Act
        const actResult: BulkWriteResult = await upsertActs(acts);                      // Upsert acts into database
        updateResult.actCount = (actResult.modifiedCount + actResult.upsertedCount);    // Record result to result object

        // Fetch all the acts newly inserted into the database
        const inserted: Array<ActDTO> = await findManyActs({
            filter: {
                version: updateId
            },
            paginate: {
                size: Env.TM_ACT_LIMIT,
                page: 0
            }
        });
        inserted.forEach(async (a: ActDTO, index: number) => {
            const result: EntryUpdateResult = await updateDatabaseEntry(a.id!, updateId, {
                currentAttempts: 0,
                maxAttempts: Env.ENGINE_RETRY_LIMIT
            });
            if (result.status !== UpdateStatus.DONE) logger.warn(`Failed to insert data for act:${a.id} after ${result.attempts} attempts`);
            if (index == inserted.length - 1) {
                updateResult.status = UpdateStatus.DONE;
                await setUpdateStatus(updateId, UpdateStatus.DONE);
                logger.info(`Database update finished - acts `, { updateId, ...updateResult });
            }
        });
    } catch (err: any) {
        updateResult.status = UpdateStatus.FAILED;
        await setUpdateStatus(updateId, UpdateStatus.FAILED);
        logger.error("Database update failed", { updateId, cause: err.message, stack: err.stack });
        logger.error(err.stack);
    }
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

const updateDatabaseEntry = async (actId: string, updateId: string, config: EntryUpdateConfig): Promise<EntryUpdateResult> => {
    config.currentAttempts++;
    var result: EntryUpdateResult = { status: UpdateStatus.STARTED, attempts: config.currentAttempts, showCount: 0, venueCount: 0 }
    try {
        const pairs: Array<[TMShow, TMVenue]> = await fetchShowsByActId(actId);
        const sResult: BulkWriteResult = await upsertShows(pairs.map((p: [TMShow, TMVenue]) => mapToShow(p[0], updateId)));
        const vResult: BulkWriteResult = await upsertVenues(pairs.map((p: [TMShow, TMVenue]) => mapToVenue(p[1], updateId)));
        result.status = UpdateStatus.DONE;
        result.showCount = (sResult.modifiedCount + sResult.upsertedCount);
        result.venueCount = (vResult.modifiedCount + vResult.upsertedCount);
        logger.info(`Inserted data for act:${actId} - ${result.showCount} shows, ${result.venueCount} venues`, {
            updateId,
            actId,
            showCount: result.showCount,
            venueCount: result.venueCount 
        });
    } catch (err: any) {
        result.status = UpdateStatus.FAILED;
        logger.error(`Failed to insert data for act:${actId}`, { updateId, actId, cause: err.message, stack: err.stack });
        logger.error(err.stack);
    }

    if ((result.status === UpdateStatus.FAILED) && (config.currentAttempts < config.maxAttempts))
        return updateDatabaseEntry(actId, updateId, config);
    else
        return result;
}
