import { BulkWriteResult } from "mongodb";
import { TMVenue, Venue, VenueModel } from "../models";

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
