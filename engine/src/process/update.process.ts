import { v4 } from "uuid";
import { ActModel, Image, TMAct } from "../entity/act";
import { ProcessStatus } from "../entity/process";
import { fetchActs } from "../ticketmaster";
import logger from "../config/logger";
import mongoose from "mongoose";
import Env from "../config/env";

/**
 * This function defines an algorithm that will update MongoDB with the top (N) acts
 * from Ticketmaster (Where N is defined by the ACT_COUNT_CUTOFF environment variable).
 */
export const updateActs = async (): Promise<void> => {
    const processId = v4();
    const processName = "updateActs";

    let processStatus = ProcessStatus.STARTED;

    logger.info('Updating acts', {
        processId,
        processName,
        processStatus,
        timestamp: new Date(Date.now()).toISOString()
    });

    let updateCount: number = 0;

    await mongoose.connect(Env.DB_STRING).then(async () => {
        // Request the top acts from Ticketmaster
        await fetchActs(Env.ACT_COUNT_CUTOFF, 0).then(async (acts: TMAct[]) => {
            if (acts.length == 0) throw new Error('Failed to seed database: No acts to insert');
            // Create or update every act returned from Ticketmaster
            acts.forEach(async (a: TMAct) => {
                let act = await ActModel.findOne({ tm_id: a.id }).select('-__v');
                if (act == null) {
                    act = await ActModel.create({
                        tm_id: a.id,
                        tm_url: a.url,
                        tm_images: a.images,
                        name: a.name,
                        locale: a.locale,
                        dateCreated: new Date(Date.now()).toISOString(),
                        dateUpdated: new Date(Date.now()).toISOString()
                    });
                } else {
                    act.date_updated = new Date(Date.now());
                    await act.save();
                }
                logger.info('Updated act', {
                    processId,
                    processName,
                    processStatus,
                    resource: `act:${act._id}`,
                    timestamp: new Date(Date.now()).toISOString()
                });

                // When updates are complete, close the connection
                updateCount++;
                if (updateCount == acts.length) {
                    mongoose.connection.close();
                    processStatus = ProcessStatus.COMPLETED;
                    logger.info('Finished updating acts', {
                        processId,
                        processName,
                        processStatus,
                        timestamp: new Date(Date.now()).toISOString()
                    });
                }
            });
        });
    });
}

export const updateShows = async (): Promise<void> => {
    const processId = v4();
    const processName = "updateShows";
    let processStatus = ProcessStatus.STARTED;
    logger.info('Updating shows', {
        processId,
        processName,
        processStatus,
        timestamp: new Date(Date.now()).toISOString()
    });
}
