import Env from "../../../config/env";
import logger from "../../../config/logger";
import { TMAct, TMShow, TMVenue, UpdateModel } from "../models";
import { fetchActs, fetchShowsByActId } from "./tm.service";
import { upsertAct } from "./act.service";
import { upsertVenue } from "./venue.service";
import { upsertShow } from "./show.service";
import { v4 } from "uuid";

export class DatabaseUpdateService {

    public static async start(): Promise<void> {
        const versionId: string = v4();
        try {
            logger.info(`Database update started - update:${versionId}`, { versionId });
            await UpdateModel.create({ versionId: versionId });
            await DatabaseUpdateService.updateDatabase(versionId);
        } catch (err: any) {
            logger.error(`Failed to update database - ${err.message}`, { versionId });
            logger.error(err.stack);
        }
    }

    private static async updateDatabase(versionId: string): Promise<void> {
        // Fetch top acts from ticketmaster
        const acts: TMAct[] = await fetchActs(Env.TM_ACT_LIMIT, 0);
        // If no data is available, end update
        if (acts.length == 0) throw new Error("Ticketmaster unavailable");
        // Otherwise, upsert all acts into database
        acts.forEach(async (a: TMAct, index: number) => {
            await DatabaseUpdateService.updateDatabaseEntry(a, versionId);
        });
    }

    private static async updateDatabaseEntry(a: TMAct, versionId: string): Promise<void> {
        try {
            await upsertAct(a, versionId);
            const shows: Array<[TMShow, TMVenue]> = await fetchShowsByActId(a.id);
            shows.forEach(async (s: [TMShow, TMVenue]) => {
                await upsertVenue(s[1], versionId);
                await upsertShow(s[0], versionId);
            });
            logger.info(`Updated act:${a.id} - update:${versionId}`, { versionId });
        } catch (err: any) {
            logger.error(`Failed to update act:${a.id} - ${err.message}`, { versionId });
            logger.error(err.stack);
        }
    }
}
