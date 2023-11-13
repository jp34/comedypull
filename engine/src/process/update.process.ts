import { v4 } from "uuid";
import { Act, ActModel } from "../entity/act";
import { ProcessStatus } from "../entity/process";
import { fetchActs } from "../ticketmaster.api";
import logger from "../config/logger";

const updateEntry = async (id: string, processId: string, processName: string): Promise<void> => {
    try {
        const act = await ActModel.exists({ ticketmasterId: id }).lean().select('-__v');
        logger.info("Updated entry", {
            processId,
            processName,
            ticketmasterId: id,
            timestamp: Date.now()
        });
    } catch (err: any) {
        logger.warn('Failed to update entry', {
            processId,
            processName,
            ticketmasterId: id,
            timestamp: Date.now()
        });
    }
}

export const updateDatabase = async (): Promise<void> => {
    const processId = v4();
    const processName = "updateDatabase";
    let processStatus = ProcessStatus.STARTED;
    logger.info('Updating entries', {
        processId,
        processName,
        processStatus,
        timestamp: Date.now()
    });

    // Fetch top 100 acts from ticketmaster and validate results were returned
    let acts: Act[] = await fetchActs();
    if (acts.length == 0) throw new Error('Failed to seed database: No acts to insert');

    // Update each entry
    acts.forEach(async (a: Act) => {
        await updateEntry(a.ticketmasterId, processId, processName);
    });
}
