import logger from "../config/logger";
import { ActModel, TMAct } from "../models/act"

export const createFromTMAct = async (a: TMAct): Promise<void> => {
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
