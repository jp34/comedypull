import { Act, ActModel, TMAct } from "../models";
import logger from "../../../config/logger";

export const upsertAct = async (a: TMAct): Promise<void> => {
    try {
        await ActModel.updateOne({ tm_id: a.id }, {
            tm_id: a.id,
            tm_url: a.url,
            images: a.images,
            name: a.name,
            locale: a.locale,
            date_updated: new Date(Date.now())
        }, { upsert: true });
    } catch (err: any) {
        logger.error("Operation failed", {
            resource: `act:${a.id}`,
            data: a,
            operation: "upsertAct",
            cause: err.message,
            timestamp: new Date(Date.now()).toISOString()
        });
    }
}

export const findActs = async (): Promise<Act[]> => {
    return await ActModel.find().lean().select("-__v");
}

export const findActById = async (id: string): Promise<Act> => {
    return await ActModel.findById(id).lean().select("-__v");
}
