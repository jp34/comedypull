import logger from "../../../config/logger";
import { TMAct, TMShow, TMVenue } from "../models";
import { fetchActs, fetchShowsByActId } from "./tm.service";
import { upsertAct } from "./act.service";
import { upsertVenue } from "./venue.service";
import { upsertShow } from "./show.service";

const updateEntry = async (a: TMAct): Promise<void> => {
    try {
        await upsertAct(a);
        const shows: Array<[TMShow, TMVenue]> = await fetchShowsByActId(a.id);
        let updateCount: number = 0;
        shows.forEach(async (e: [TMShow, TMVenue]) => {
            await upsertVenue(e[1]);
            await upsertShow(e[0]);
            updateCount++;
            if (updateCount == shows.length) {
                logger.debug("Updated entry", {
                    resource: `act:${a.id}`,
                    timestamp: new Date(Date.now()).toISOString()
                });
            }
        });
    } catch (err: any) {
        logger.error("Failed to update entry", {
            resource: `act:${a.id}`,
            cause: err.message,
            timestamp: new Date(Date.now()).toISOString()
        });
    }
}

export const updateDatabase = async (): Promise<void> => {
    try {
        const acts: TMAct[] = await fetchActs(100, 0);
        let updateCount: number = 0;
        acts.forEach(async (a: TMAct) => {
            await updateEntry(a);
            updateCount++;
            if (updateCount == acts.length) {
                logger.info("Completed database update", {
                    count: acts.length,
                    timestamp: new Date(Date.now()).toISOString()
                });
            }
        });
    } catch (err: any) {
        logger.error("Failed to update database", {
            cause: err.message,
            timestamp: new Date(Date.now()).toISOString()
        });
    }
}
