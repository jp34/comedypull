import { BulkWriteResult } from "mongodb";
import { TMShow, Show, ShowModel, ShowDTO, NonExistentResourceError, ShowQuery, ShowFilter } from "../domain";

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

export const findShows = async (filter: ShowFilter = {}, size: number = 10, page: number = 0): Promise<Array<ShowDTO>> => {
    return await ShowModel.find(filter)
        .limit(size)
        .skip((size * page))
        .select({ _id: 0, __v: 0 })
        .lean();
}

export const findShow = async (filter: ShowFilter): Promise<ShowDTO> => {
    const show: ShowDTO | null = await ShowModel
        .findOne(filter)
        .select({ _id: 0, __v: 0 })
        .lean();
    if (show == undefined) throw new NonExistentResourceError(
        `Resource does not exist - show:${JSON.stringify(filter)}`
    );
    return show;
}
