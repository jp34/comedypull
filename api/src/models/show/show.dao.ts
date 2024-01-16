
import { ShowQuery } from "./show.query";
import { ShowModel } from "./show.model";
import { NearbyFilter, buildNearbyFilter } from "../geo";
import {
    ShowResponse,
    ShowDetailResponse,
    ShowResponseFieldProjection,
    ShowDetailResponseFieldProjection
} from "./show.dto";
import { ActResponseFieldProjection } from "../act";
import { VenueResponseFieldProjection } from "../venue";

export class ShowDAO {

    static async findMany(query: ShowQuery): Promise<Array<ShowResponse>> {
        const limit: number = query.size ?? 10;
        const offset: number = (query.page ?? 0) * limit;
        const nearbyFilter: NearbyFilter | any = (query.location)
            ? buildNearbyFilter(query.location.longitude, query.location.latitude)
            : {};
        return await ShowModel.aggregate([
            { $match: { ...query.filter, ...nearbyFilter }},
            { $limit: limit },
            { $skip: offset },
            { $lookup: {
                from: "acts",
                localField: "actId",
                foreignField: "_id",
                as: "act",
            }},
            { $lookup: {
                from: "venues",
                localField: "venueId",
                foreignField: "_id",
                as: "venue",
            }},
            { $project: { ...ShowResponseFieldProjection }},
            { $unwind: { path: "$act" }},
            { $unwind: { path: "$venue" }},
            { $unwind: { path: "$images" }}
        ]);
    }

    static async findOne(query: ShowQuery): Promise<ShowDetailResponse | null> {
        const data = await ShowModel.aggregate([
            { $match: { ...query.filter }},
            { $limit: 1 },
            { $lookup: {
                from: "acts",
                localField: "actId",
                foreignField: "_id",
                as: "act",
            }},
            { $lookup: {
                from: "venues",
                localField: "venueId",
                foreignField: "_id",
                as: "venue",
            }},
            { $project: { ...ShowDetailResponseFieldProjection }},
            { $unwind: { path: "$act" }},
            { $unwind: { path: "$venue" }},
            { $unwind: { path: "$images"}}
        ]);
        return data[0];
    }
}
