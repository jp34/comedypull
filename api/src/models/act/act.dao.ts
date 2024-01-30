import { ActModel } from "./act.model";
import { ActQuery } from "../query";
import {
    ActResponse,
    ActDetailResponse,
    ActResponseFieldProjection,
    ActDetailResponseFieldProjection
} from "./act.dto";
import { buildImageProjectionFilter } from "../../helpers/query.helper";

export class ActDAO {

    static async findMany(query: ActQuery): Promise<Array<ActResponse>> {
        const limit: number = query.size ?? 10;
        const offset: number = (query.page ?? 0) * limit;
        return await ActModel.aggregate([
            { $match: { ...query.filter }},
            { $limit: limit },
            { $skip: offset },
            { $project: {
                ...ActResponseFieldProjection,
                images: buildImageProjectionFilter("RETINA_PORTRAIT_3_2")
            }}
        ]);
    }

    static async findOne(query: ActQuery): Promise<ActDetailResponse | null> {
        return (await ActModel.aggregate([
            { $match: { ...query.filter }},
            { $limit: 1 },
            { $lookup: {
                from: "shows",
                localField: "_id",
                foreignField: "actId",
                as: "shows"
            }},
            { $project: {
                ...ActDetailResponseFieldProjection,
                images: buildImageProjectionFilter("RETINA_PORTRAIT_3_2")
            }}
        ]))[0];
    }
}
