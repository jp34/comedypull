import { Act, ActModel } from "../models";

export const findActs = async (): Promise<Act[]> => {
    return await ActModel.find().lean().select("-__v");
}

export const findActById = async (id: string): Promise<Act> => {
    return await ActModel.findById(id).lean().select("-__v");
}
