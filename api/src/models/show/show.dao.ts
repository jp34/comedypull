
import { ShowQuery } from "./show.query";
import { ShowModel } from "./show.model";
import { NearbyFilter, buildNearbyFilter } from "../geo";
import {
    ShowResponse,
    ShowDetailResponse,
    ShowResponseFieldProjection,
    ShowDetailResponseFieldProjection
} from "./show.dto";
import { PipelineStage } from "mongoose";
import { buildImageProjectionFilter } from "../../helpers/query.helper";

export class ShowDAO {

    private static buildShowPipeline(filter: any, projection: any, limit: number, offset: number): Array<PipelineStage> {
        return [
            { $match: filter},
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
            { $project: {
                ...projection,
                images: buildImageProjectionFilter("RETINA_PORTRAIT_3_2")
            }},
            { $unwind: { path: "$act" }},
            { $unwind: { path: "$venue" }}
        ];
    }

    static async findMany(query: ShowQuery): Promise<Array<ShowResponse>> {
        const limit: number = query.size ?? 10;
        const offset: number = (query.page ?? 0) * limit;
        const nearbyFilter: NearbyFilter | any = (query.location)
            ? buildNearbyFilter(query.location.longitude, query.location.latitude)
            : {};
        const pipeline: Array<PipelineStage> = ShowDAO.buildShowPipeline(
            { ...query.filter, ...nearbyFilter},
            ShowResponseFieldProjection,
            limit,
            offset
        );
        return await ShowModel.aggregate(pipeline);
    }

    static async findOne(query: ShowQuery): Promise<ShowDetailResponse | null> {
        const pipeline: Array<PipelineStage> = ShowDAO.buildShowPipeline(
            query.filter,
            ShowDetailResponseFieldProjection,
            1,
            0
        );
        return (await ShowModel.aggregate(pipeline))[0];
    }
}
