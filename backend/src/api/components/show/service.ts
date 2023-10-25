import { Show, ShowModel, CreateShowPayload, ShowSearchParams } from "./entity";
import logger from "../../../config/logger";

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
        comedianId: params.comedianId,
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

export const updateShowDate = async (id: string, newDate: string): Promise<Boolean> => {
    const show = await ShowModel.findById(id).select('_id date');
    if (!show) throw new Error("NonExistentResource!");
    show.date = new Date(newDate);
    await show.save();
    logger.info({
        action: "updateShowDate",
        resource: `show:${show._id}`
    });
    return true;
}

export const updateShowVenueName = async (id: string, newName: string): Promise<Boolean> => {
    const show = await ShowModel.findById(id).select('_id venueName');
    if (!show) throw new Error("NonExistentResource!");
    show.venueName = newName;
    await show.save();
    logger.info({
        action: "updateShowVenueName",
        resource: `show:${show._id}`
    });
    return true;
}

export const updateShowVenueAddress = async (id: string, newAddress: string): Promise<Boolean> => {
    const show = await ShowModel.findById(id).select('_id venueAddress');
    if (!show) throw new Error("NonExistentResource!");
    show.venueAddress = newAddress;
    await show.save();
    logger.info({
        action: "updateShowVenueAddress",
        resource: `show:${show._id}`
    });
    return true;
}

export const deleteShow = async (id: string): Promise<Boolean> => {
    const show = await ShowModel.findById(id).select("_id");
    if (!show) throw new Error("NonExistentResource!");
    await show.deleteOne();
    logger.info({
        action: "deleteShow",
        resource: `show:${show._id}`
    });
    return true;
}
