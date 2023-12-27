import { BulkWriteResult } from "mongodb";
import { TMShow, Show, ShowModel, ShowDTO, ShowSearchParams, NonExistentResourceError } from "../domain";

export const mapToShow = (show: TMShow, version: string): Show => {
    return {
        ...show,
        version,
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now())
    }
}

export const upsertShows = async (shows: Array<Show>): Promise<BulkWriteResult> => {
    return await ShowModel.bulkWrite(shows.map((s: Show) => ({
        updateOne: {
            filter: { id: s.id },
            update: s,
            upsert: true
        }
    })));
}

export const findShows = async (params: ShowSearchParams = {}): Promise<Array<ShowDTO>> => {
    const limit: number = (params.size) ? params.size : 10;
    const offset: number = ((params.page) ? params.page : 0) * limit;
    return await ShowModel.find({ ...params.filter })
        .limit(limit)
        .skip(offset)
        .select({ _id: 0, __v: 0 })
        .lean();
}

export const findShow = async (params: ShowSearchParams): Promise<ShowDTO> => {
    const show: ShowDTO | null = await ShowModel
        .findOne({ ...params.filter })
        .select({ _id: 0, __v: 0 })
        .lean();
    if (show == undefined) throw new NonExistentResourceError(
        `Resource does not exist - show:${JSON.stringify(params.filter)}`
    );
    return show;
}
