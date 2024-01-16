import { ActModel } from "./act.model";
import { ActQuery } from "./act.query";
import {
    ActResponse,
    ActDetailResponse,
    ActResponseFieldProjection,
    ActDetailResponseFieldProjection
} from "./act.dto";

export class ActDAO {

    static async findMany(query: ActQuery): Promise<Array<ActResponse>> {
        const limit: number = query.size ?? 10;
        const offset: number = (query.page ?? 0) * limit;
        return await ActModel.find({ ...query.filter })
            .limit(limit)
            .skip(offset)
            .select(ActResponseFieldProjection)
            .lean();
    }

    static async findOne(query: ActQuery): Promise<ActDetailResponse | null> {
        return await ActModel.findOne({ ...query.filter })
            .select(ActDetailResponseFieldProjection)
            .lean();
    }
}
