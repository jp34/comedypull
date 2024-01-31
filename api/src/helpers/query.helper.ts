import Env from "../config/env";
import { PipelineStage } from "mongoose";
import { Query } from "../models";

export const buildLimitSkipStages = (query: Query): Array<PipelineStage> => {
    const limit: number = query.size ?? 10;
    const offset: number = (query.page) ? (query.page * limit) : 0;
    return [{ $limit: limit }, { $skip: offset }];
}

export const buildGeoNearStage = (geo: [number, number], query: any): PipelineStage => {
    return {
        $geoNear: {
            near: { type: "Point", coordinates: geo },
            distanceField: "dist",
            maxDistance: (Env.API_NEARBY_LIMIT * 1609.34),  // Convert miles to meters
            spherical: true,
            query: query
        }
    }
}

export const buildImageProjectionFilter = (regex: string): any => {
    return {
        $filter: {
            input: "$images",
            as: "i",
            cond: {
                $regexMatch: {
                    input: "$$i.url",
                    regex: regex
                }
            }
        }
    }
}
