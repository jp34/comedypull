import { Show, ShowModel, ShowSearchParams } from "./entity";
import logger from "../../../config/logger";

export const findShowById = async (id: string): Promise<Show> => {
    const show = await ShowModel.findById(id).lean().select('-__v');
    if (!show) throw new Error("NonExistentResource!");
    logger.info({
        action: "findShowById",
        resource: `show:${show._id}`
    });
    return show;
}

export const findShowBySearch = async (params: ShowSearchParams, limit: number = 10, offset: number = 0): Promise<Array<Show>> => {
    const shows = await ShowModel.find({
        comedianId: params.actId,
        venueName: params.venueName,
        date: {
            $gte: params.dateFrom,
            $lte: params.dateUntil
        }
    }).limit(limit).skip(offset).lean().select('-__v');
    logger.info({
        action: "findShowBySearch",
    });
    return shows;
}
