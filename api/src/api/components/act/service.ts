import { Act, ActModel, ActSearchParams } from "./entity";
import logger from "../../../config/logger";

export const findActById = async (id: string): Promise<Act> => {
    const act = await ActModel.findById(id).lean();
    if (!act) throw new Error("NonExistentResource!");
    logger.info({
        action: "findActById",
        resource: `act:${act._id}`
    });
    return act;
}

export const findActsBySearch = async (params: ActSearchParams): Promise<Array<Act>> => {
    const acts = await ActModel.find(params).lean();
    logger.info({
        action: "findActsBySearch"
    });
    return acts;
}
