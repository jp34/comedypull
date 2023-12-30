import { BulkWriteResult } from "mongodb";
import {
    Show,
    ShowModel,
    ShowDTO,
    ShowFilter,
    ShowQuery,
    NearbyFilter,
    buildNearbyFilter,
    NonExistentResourceError
} from "../domain";

export const upsertShows = async (shows: Array<Show>): Promise<BulkWriteResult> => {
    return await ShowModel.bulkWrite(shows.map((s: Show) => ({
        updateOne: {
            filter: { id: s.id },
            update: s,
            upsert: true
        }
    })));
}

export const findManyShows = async (query: ShowQuery): Promise<Array<ShowDTO>> => {
    const limit: number = query.paginate?.size ?? 10;
    const offset: number = (query.paginate?.page ?? 0) * limit;
    const nearbyFilter: NearbyFilter | any = (query.location)
        ? buildNearbyFilter(query.location.longitude, query.location.latitude)
        : {};
    const filter: any = { ...query.filter, ...nearbyFilter };
    return await ShowModel.find(filter)
        .limit(limit)
        .skip(offset)
        .select({ _id: 0, __v: 0 })
        .lean();
}

export const findOneShow = async (filter: ShowFilter): Promise<ShowDTO> => {
    const show: ShowDTO | null = await ShowModel
        .findOne(filter)
        .select({ _id: 0, __v: 0 })
        .lean();
    if (show == undefined) throw new NonExistentResourceError(
        `Resource does not exist - show:${JSON.stringify(filter)}`
    );
    return show;
}
