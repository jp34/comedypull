import { BulkWriteResult } from "mongodb";
import { TMVenue, Venue, VenueModel, VenueSearchParams } from "../domain";

export const mapToVenue = (venue: TMVenue, version: string): Venue => {
    return {
        ...venue,
        version,
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now())
    }
}

export const upsertVenues = async (venues: Array<Venue>): Promise<BulkWriteResult> => {
    return await VenueModel.bulkWrite(venues.map((v: Venue) => ({
        updateOne: {
            filter: { id: v.id },
            update: v,
            upsert: true
        }
    })));
}

export const findVenues = async (params: VenueSearchParams): Promise<Array<Venue>> => {
    const limit: number = (params.size) ? params.size : 10;
    const offset: number = ((params.page) ? params.page : 0) * limit;
    return await VenueModel.find(params.filter)
        .limit(limit)
        .skip(offset)
        .lean();
}

export const findVenue = async (params: VenueSearchParams): Promise<Venue | null> => {
    return await VenueModel.findOne(params.filter).lean();
}
