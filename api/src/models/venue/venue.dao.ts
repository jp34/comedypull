import { VenueModel } from "./venue.model";
import { NearbyQuery, VenueQuery } from "../query";
import {
    VenueResponse,
    VenueDetailResponse,
    VenueResponseFieldProjection,
    VenueDetailResponseFieldProjection
} from "./venue.dto";
import { buildGeoNearStage, buildLimitSkipStages } from "../../helpers/query.helper";

export class VenueDAO {

    static async findNearby(query: NearbyQuery): Promise<Array<VenueResponse>> {
        return await VenueModel.aggregate([
            buildGeoNearStage([query.geo.longitude, query.geo.latitude], {}),
            ...buildLimitSkipStages(query),
            { $project: {
                ...VenueResponseFieldProjection,
                images: 1
            }}
        ]);
    }

    static async findMany(query: VenueQuery): Promise<Array<VenueResponse>> {
        return await VenueModel.aggregate([
            { $match: { ...query.filter }},
            ...buildLimitSkipStages(query),
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
            { $skip: 0 },
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
