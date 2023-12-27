import { BulkWriteResult } from "mongodb";
import { TMAct, Act, ActModel, ActSearchParams, ActDTO } from "../domain";

export const mapToAct = (act: TMAct, version: string): Act => {
    return {
        ...act,
        version,
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now())
    };
}

export const upsertActs = async (acts: Array<Act>): Promise<BulkWriteResult> => {
    return await ActModel.bulkWrite(acts.map((a: Act) => ({
        updateOne: {
            filter: { id: a.id },
            update: a,
            upsert: true
        }
    })));
}

export const findActs = async (params: ActSearchParams): Promise<Array<ActDTO>> => {
    const limit: number = (params.size) ? params.size : 10;
    const offset: number = ((params.page) ? params.page : 0) * limit;
    return await ActModel.find(params.filter)
        .limit(limit)
        .skip(offset)
        .select({ _id: 0, __v: 0 })
        .lean();
}

export const findAct = async (params: ActSearchParams): Promise<ActDTO | null> => {
    return await ActModel.findOne(params.filter)
        .select({ _id: 0, __v: 0 })
        .lean();
}
