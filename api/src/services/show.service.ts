import {
    ShowResponse,
    ShowDetailResponse,
    ShowModel,
    ShowQuery,
    NearbyFilter,
    buildNearbyFilter,
    NonExistentResourceError,
    ShowDetailResponseFieldMask,
    ShowResponseFieldMask,
    ActResponseFieldMask,
    VenueResponseFieldMask
} from "../domain";

export const findShows = async (query: ShowQuery): Promise<Array<ShowResponse>> => {
    const limit: number = query.size ?? 10;
    const offset: number = (query.page ?? 0) * limit;
    const nearbyFilter: NearbyFilter | any = (query.location)
        ? buildNearbyFilter(query.location.longitude, query.location.latitude)
        : {};
    const filter: any = { ...query.filter, ...nearbyFilter };
    return await ShowModel.find(filter)
        .limit(limit)
        .skip(offset)
        .select(ShowResponseFieldMask)
        .lean();
}

export const findShowDetails = async (query: ShowQuery): Promise<ShowDetailResponse> => {
    const show: ShowDetailResponse | null = await ShowModel
        .findOne({ ...query.filter })
        .select(ShowDetailResponseFieldMask)
        .populate([
            {
                path: "act",
                select: ActResponseFieldMask
            },
            {
                path: "venue",
                select: VenueResponseFieldMask
            }
        ])
        .lean();
    if (show == undefined)
        throw new NonExistentResourceError(
            `Resource does not exist - show:${JSON.stringify(query)}`
        );
    return show;
}
