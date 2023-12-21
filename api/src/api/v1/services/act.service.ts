import { BulkWriteResult } from "mongodb";
import { TMAct, Act, ActModel } from "../models";

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

export const findActs = async (select: string = ""): Promise<Array<Act>> => {
    return await ActModel.find().lean().select(select);
}

export const findActsByVersion = async (version: string, select: string = ""): Promise<Array<Act>> => {
    return await ActModel.find({ version }).lean().select(select);
}

export const findActById = async (id: string, select: string = ""): Promise<Act> => {
    return await ActModel.findById(id).lean().select(select);
}
