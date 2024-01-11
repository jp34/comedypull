import {
    NearbyFilter,
    NonExistentResourceError,
    VenueResponse,
    VenueDetailResponse,
    VenueModel,
    VenueQuery,
    VenueResponseFieldMask,
    buildNearbyFilter,
    VenueDetailResponseFieldMask
} from "../domain";
import { findShows } from "./show.service";

export const findVenues = async (query: VenueQuery): Promise<Array<VenueResponse>> => {
    const limit: number = query.size ?? 10;
    const offset: number = (query.page ?? 0) * limit;
    const nearbyFilter: NearbyFilter | any = (query.location)
        ? buildNearbyFilter(query.location.longitude, query.location.latitude)
        : {};
    return await VenueModel.find({ ...query.filter, ...nearbyFilter })
        .limit(limit)
        .skip(offset)
        .select(VenueResponseFieldMask)
        .lean();
}

export const findVenueDetails = async (query: VenueQuery): Promise<VenueDetailResponse> => {
    const venue: VenueDetailResponse | null = await VenueModel
        .findOne({ ...query.filter })
        .select(VenueDetailResponseFieldMask)
        .lean();
    if (venue == undefined)
        throw new NonExistentResourceError(`Resource does not exist - show:${JSON.stringify(query.filter)}`);
    venue.shows = await findShows({ filter: { venue: venue._id }});
    return venue;
}
