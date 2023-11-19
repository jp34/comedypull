import { v4 } from "uuid";
import { ActModel, TMAct } from "../entity/act";
import { ProcessStatus } from "../entity/process";
import { fetchActs } from "../ticketmaster";
import logger from "../config/logger";
import mongoose from "mongoose";
import Env from "../config/env";

export const updateActs = async () => {
    const processId = v4();
    const processName = "updateActs";
    let processStatus = ProcessStatus.STARTED;
    logger.info('Updating acts', {
        processId,
        processName,
        processStatus,
        timestamp: Date.now()
    });

    await mongoose.connect(Env.DB_STRING).then(async () => {
        await fetchActs(Env.ACT_COUNT_CUTOFF, 0).then(async (acts: TMAct[]) => {
            if (acts.length == 0) throw new Error('Failed to seed database: No acts to insert');
            
            acts.forEach(async (a: TMAct, index: number) => {
                let act = await ActModel.findOne({ tm_id: a.id }).select('-__v');
                if (act == null) {
                    act = await ActModel.create({
                        tm_id: a.id,
                        tm_url: a.url,
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
            });
        });
    });
}