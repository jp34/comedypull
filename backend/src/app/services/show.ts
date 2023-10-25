import { Show, ShowModel } from "../../domain/entity";
import { CreateShowPayload, ShowSearchParams } from "../../domain/io";
import logger from "../../config/logger";

export const createShow = async (payload: CreateShowPayload): Promise<Show> => {
    const show = await ShowModel.create({
        comedianId: payload.comedianId,
        date: payload.date,
        venueName: payload.venueName,
        venueAddress: payload.venueAddress
    });
    logger.info({
        action: "createShow",
        resource: `show:${show._id}`
    });
    return show;
}

export const findShowById = async (id: string): Promise<Show> => {
    const show = await ShowModel.findById(id).lean();
    if (!show) throw new Error("NonExistentResource!");
    logger.info({
        action: "findShowById",
        resource: `show:${show._id}`
    });
    return show;
}

export const findShowBySearch = async (params: ShowSearchParams): Promise<Array<Show>> => {

}