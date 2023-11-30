import { Act, ActModel, TMAttraction } from "../models";
import logger from "../../../config/logger";

export const createFromTMAttraction = async (a: TMAttraction): Promise<void> => {
    const exists = await ActModel.exists({ tm_id: a.id }).lean().select('-__v');
    if (exists != null) return;
    await ActModel.create({
        tm_id: a.id,
        tm_url: a.url,
        tm_images: a.images,
        name: a.name,
        locale: a.locale,
        dateCreated: new Date(Date.now()).toISOString(),
        dateUpdated: new Date(Date.now()).toISOString()
    }).catch((err: any) => {
        logger.warn("Failed to ", {
            cause: err.message,
            resource: `act:${a.id}`,
            timestamp: new Date(Date.now()).toISOString()
        });
    });
}

export const findActs = async (): Promise<Act[]> => {
    return await ActModel.find().lean().select("-__v");
}

export const findActById = async (id: string): Promise<Act> => {
    return await ActModel.findById(id).lean().select("-__v");
}
