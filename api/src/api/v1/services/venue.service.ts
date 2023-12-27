import { BulkWriteResult } from "mongodb";
import { NonExistentResourceError, TMVenue, Venue, VenueDTO, VenueModel, VenueSearchParams } from "../domain";

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

export const findVenues = async (params: VenueSearchParams = {}): Promise<Array<VenueDTO>> => {
    const limit: number = (params.size) ? params.size : 10;
    const offset: number = ((params.page) ? params.page : 0) * limit;
    return await VenueModel.find({ ...params.filter })
        .limit(limit)
        .skip(offset)
        .select({ _id: 0, __v: 0 })
        .lean();
}

export const findVenue = async (params: VenueSearchParams): Promise<VenueDTO> => {
    const venue: VenueDTO | null = await VenueModel
        .findOne({ ...params.filter })
        .select({ _id: 0, __v: 0 })
        .lean();
    if (venue == undefined) throw new NonExistentResourceError(
        `Resource does not exist - show:${JSON.stringify(params.filter)}`
    );
    return venue;
}
