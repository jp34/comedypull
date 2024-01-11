import {
    ActModel,
    NonExistentResourceError,
    ActQuery,
    ActResponse,
    ActDetailResponse,
    ActDetailResponseFieldMask,
    ActResponseFieldMask
} from "../domain";
import { findShows } from "./show.service";

export const findActs = async (query: ActQuery): Promise<Array<ActResponse>> => {
    const limit: number = query.size ?? 10;
    const offset: number = (query.page ?? 0) * limit;
    return await ActModel.find({ ...query.filter })
        .limit(limit)
        .skip(offset)
        .select(ActResponseFieldMask)
        .lean();
}

export const findActDetails = async (query: ActQuery): Promise<ActDetailResponse> => {
    const act: ActDetailResponse | null = await ActModel.findOne({ ...query.filter })
        .select(ActDetailResponseFieldMask)
        .lean();
    if (act == undefined)
        throw new NonExistentResourceError(`Resource does not exist - act:${JSON.stringify(query)}`);
    act.shows = await findShows({ filter: { act: act._id }});
    return act;
}
