import { VenueModel } from "./venue.model";
import { VenueQuery } from "./venue.query";
import { NearbyFilter, buildNearbyFilter } from "../geo";
import {
    VenueResponse,
    VenueDetailResponse,
    VenueResponseFieldProjection,
    VenueDetailResponseFieldProjection
} from "./venue.dto";

export class VenueDAO {

    static async findMany(query: VenueQuery): Promise<Array<VenueResponse>> {
        const limit: number = query.size ?? 10;
        const offset: number = (query.page ?? 0) * limit;
        const nearbyFilter: NearbyFilter | any = (query.location)
            ? buildNearbyFilter(query.location.longitude, query.location.latitude)
            : {};
        return await VenueModel.aggregate([
            { $match: { ...query.filter, ...nearbyFilter }},
            { $limit: limit },
            { $skip: offset },
            { $project: {
                ...VenueResponseFieldProjection,
                images: 1
            }}
        ]);
    }

    static async findOne(query: VenueQuery): Promise<VenueDetailResponse | null> {
        return (await VenueModel.aggregate([
            { $match: { ...query.filter }},
            { $limit: 1 },
            { $lookup: {
                from: "shows",
                localField: "_id",
                foreignField: "venueId",
                as: "shows"
            }},
            { $project: {
                ...VenueDetailResponseFieldProjection,
                images: 1
            }}
        ]))[0];
    }
}
