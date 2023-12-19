import { UpdateWriteOpResult } from "mongoose";
import { Act, ActModel, TMAct } from "../models";

export const upsertAct = async (a: TMAct, versionId: string): Promise<UpdateWriteOpResult> => {
    return await ActModel.updateOne({ id: a.id }, {
        id: a.id,
        url: a.url,
        name: a.name,
        images: a.images,
        locale: a.locale,
        versionId: versionId
    }, { upsert: true });
}

export const findActs = async (): Promise<Act[]> => {
    return await ActModel.find().lean().select("-__v");
}

export const findActById = async (id: string): Promise<Act> => {
    return await ActModel.findById(id).lean().select("-__v");
}
