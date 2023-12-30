import { BulkWriteResult } from "mongodb";
import { Act, ActModel, ActDTO, NonExistentResourceError, ActQuery } from "../domain";

export const upsertActs = async (acts: Array<Act>): Promise<BulkWriteResult> => {
    return await ActModel.bulkWrite(acts.map((a: Act) => ({
        updateOne: {
            filter: { id: a.id },
            update: a,
            upsert: true
        }
    })));
}

export const findManyActs = async (query: ActQuery): Promise<Array<ActDTO>> => {
    const limit: number = query.paginate?.size ?? 10;
    const offset: number = (query.paginate?.page ?? 0) * limit;
    return await ActModel.find({ ...query.filter })
        .limit(limit)
        .skip(offset)
        .select({ _id: 0, __v: 0 })
        .lean();
}

export const findOneAct = async (query: ActQuery): Promise<ActDTO> => {
    const act: ActDTO | null = await ActModel
        .findOne({ ...query.filter })
        .select({ _id: 0, __v: 0 })
        .lean();
    if (act == undefined) throw new NonExistentResourceError(
        `Resource does not exist - act:${JSON.stringify(query.filter)}`
    );
    return act;
}
