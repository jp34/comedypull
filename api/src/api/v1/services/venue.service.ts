import { BulkWriteResult } from "mongodb";
import { NearbyFilter, NonExistentResourceError, Venue, VenueDTO, VenueModel, VenueQuery, buildNearbyFilter } from "../domain";

export const upsertVenues = async (venues: Array<Venue>): Promise<BulkWriteResult> => {
    return await VenueModel.bulkWrite(venues.map((v: Venue) => ({
        updateOne: {
            filter: { id: v.id },
            update: v,
            upsert: true
        }
    })));
}

export const findManyVenues = async (query: VenueQuery): Promise<Array<VenueDTO>> => {
    const limit: number = query.paginate?.size ?? 10;
    const offset: number = (query.paginate?.page ?? 0) * limit;
    const nearbyFilter: NearbyFilter | any = (query.location)
        ? buildNearbyFilter(query.location.longitude, query.location.latitude)
        : {};
    return await VenueModel.find({ ...query.filter, ...nearbyFilter })
        .limit(limit)
        .skip(offset)
        .select({ _id: 0, __v: 0 })
        .lean();
}

export const findOneVenue = async (query: VenueQuery): Promise<VenueDTO> => {
    const venue: VenueDTO | null = await VenueModel
        .findOne({ ...query.filter })
        .select({ _id: 0, __v: 0 })
        .lean();
    if (venue == undefined) throw new NonExistentResourceError(
        `Resource does not exist - show:${JSON.stringify(query.filter)}`
    );
    return venue;
}
