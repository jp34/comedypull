import mongoose from "mongoose";
import { v4 } from "uuid";
import Env from "../../config/env";
import logger from "../../config/logger";
import { Act, ActModel, Show, ShowModel, TMAttraction, TMEvent } from "../models";
import { fetchAttractions, fetchEventsById } from "./tm.service";
import { createFromTMAttraction } from "./act.service";

export const start = async (): Promise<void> => {
    let processId: string = v4();
    logger.info("Updating database", {
        processId,
        timestamp: new Date(Date.now()).toISOString()
    });
    await updateActs(processId);
    await updateShows(processId);
}

/**
 * This function defines an algorithm that will update MongoDB with the top (N) acts
 * from Ticketmaster (Where N is defined by the ACT_COUNT_CUTOFF environment variable).
 */
export const updateActs = async (processId: string): Promise<void> => {
    logger.info("Process Started", {
        processId,
        processName: "updateActs",
        timestamp: new Date(Date.now()).toISOString()
    });

    let updateCount: number = 0;
    await mongoose.connect(Env.DB_STRING).then(async () => {
        // Request the top 100 attractions from Ticketmaster
        await fetchAttractions(100, 0).then(async (acts: TMAttraction[]) => {
            if (acts.length == 0) throw new Error("Failed to update acts: No acts to insert");
            // Create or update every act returned from Ticketmaster
            acts.forEach(async (a: TMAttraction) => {
                let act = await ActModel.findOne({ tm_id: a.id }).select('-__v');
                if (act == null) await createFromTMAttraction(a);
                logger.info('Updated act', {
                    processId,
                    resource: `act:${a.id}`,
                    timestamp: new Date(Date.now()).toISOString()
                });

                // When updates are complete, close the connection
                updateCount++;
                if (updateCount == acts.length) {
                    mongoose.connection.close();
                    logger.info('Process Completed', {
                        processId,
                        processName: "updateActs",
                        timestamp: new Date(Date.now()).toISOString()
                    });
                }
            });
        });
    });
}

export const updateShows = async (processId: string): Promise<void> => {
    logger.info("Process Started", {
        processId,
        processName: "updateShows",
        timestamp: new Date(Date.now()).toISOString()
    });

    let updateCount: number = 0;
    await mongoose.connect(Env.DB_STRING).then(async () => {
        const acts: Act[] = await ActModel.find().lean().select("-__v");
        if (acts.length == 0) throw new Error("Failed to update shows: No shows to insert");

        acts.forEach(async (a: Act) => {
            const events: TMEvent[] = await fetchEventsById(a.tm_id);

            updateCount++;
            if (updateCount == acts.length) {
                mongoose.connection.close();
                logger.info('Process Completed', {
                    processId,
                    processName: "updateShows",
                    timestamp: new Date(Date.now()).toISOString()
                });
            }
        });
    });
}
