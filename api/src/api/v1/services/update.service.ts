import Env from "../../../config/env";
import logger from "../../../config/logger";
import { TMAct, TMShow, TMVenue, UpdateModel } from "../models";
import { fetchActs, fetchShowsByActId } from "./tm.service";
import { upsertAct } from "./act.service";
import { upsertVenue } from "./venue.service";
import { upsertShow } from "./show.service";
import { v4 } from "uuid";

enum UpdateContainerStatus {
    READY = "READY",
    STARTED = "STARTED",
    DONE = "DONE",
    FAILED = "FAILED"
}

interface UpdateContainerResult {
    attempts: number;
    success: boolean;
}

class UpdateContainer {

    private a: TMAct;
    private versionId: string;
    private attempts: number;
    private s: UpdateContainerStatus;

    constructor(a: TMAct, versionId: string) {
        this.a = a;
        this.versionId = versionId;
        this.attempts = 0;
        this.s = UpdateContainerStatus.READY;
    }

    public static create(a: TMAct, versionId: string) {
        return new UpdateContainer(a, versionId);
    }

    public status() {
        return this.s;
    }

    public async start(n: number): Promise<void> {
        do {
            try {
                this.attempts++;
                await this.attempt();
                logger.info(`Updated act:${this.a.id} - update:${this.versionId}`, {
                    act: this.a.id,
                    update: this.versionId
                });
            } catch (err: any) {
                logger.debug(`Update attempt failed for act:${this.a.id} - update:${this.versionId}`, {
                    act: this.a.id,
                    update: this.versionId
                });
            }
        } while (this.attempts < n);
    }

    private async attempt(): Promise<void> {
        await upsertAct(this.a, this.versionId);
        const shows: Array<[TMShow, TMVenue]> = await fetchShowsByActId(this.a.id);
        shows.forEach(async (s: [TMShow, TMVenue]) => {
            await upsertVenue(s[1], this.versionId);
            await upsertShow(s[0], this.versionId);
        });
    }
}

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
        logger.info(`Database update started - update:${versionId}`, { versionId });
        const acts: TMAct[] = await fetchActs(Env.TM_ACT_LIMIT, 0);
        var containers: Array<UpdateContainer> = acts.map((a: TMAct) => UpdateContainer.create(a, versionId));
        var updateCount: number = 0;
        containers.forEach((c: UpdateContainer) => c.start(2).then(() => { updateCount++; }));
        
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
