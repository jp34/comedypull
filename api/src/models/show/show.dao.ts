import { Query, NearbyQuery, ShowQuery } from "../query";
import { ShowModel } from "./show.model";
import {
    ShowResponse,
    ShowDetailResponse,
    ShowResponseFieldProjection,
    ShowDetailResponseFieldProjection
} from "./show.dto";
import { PipelineStage } from "mongoose";
import { buildImageProjectionFilter, buildGeoNearStage } from "../../helpers/query.helper";
import logger from "../../config/logger";

export class ShowDAO {

    static async findNearby(query: NearbyQuery): Promise<Array<ShowResponse>> {
        const pipeline: Array<PipelineStage> = [
            buildGeoNearStage([query.geo.longitude, query.geo.latitude]),
            ...ShowDAO.buildShowPipeline(query, ShowResponseFieldProjection)
        ];
        return await ShowModel.aggregate(pipeline);
    }

    static async findMany(query: ShowQuery): Promise<Array<ShowResponse>> {
        const pipeline: Array<PipelineStage> = [
            { $match: { ...query.filter }},
            ...ShowDAO.buildShowPipeline(query, ShowResponseFieldProjection)
        ];
        return await ShowModel.aggregate(pipeline);
    }

    static async findOne(query: ShowQuery): Promise<ShowDetailResponse | null> {
        const pipeline: Array<PipelineStage> = [
            { $match: { ...query.filter }},
            ...ShowDAO.buildShowPipeline(query, ShowDetailResponseFieldProjection)
        ];
        return (await ShowModel.aggregate(pipeline))[0];
    }

    private static buildShowPipeline(query: Query, projection: any): Array<PipelineStage> {
        const limit: number = query.size ?? 10;
        const offset: number = (query.page) ? (query.page * limit) : 0;
        logger.debug(limit);
        logger.debug(offset);
        return [
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
}
