import logger from "../config/logger";
import {
    ShowDAO,
    ShowQuery,
    ShowResponse,
    ShowDetailResponse,
    NonExistentResourceError
} from "../models";

export class ShowService {

    static async findMany(query: ShowQuery): Promise<Array<ShowResponse>> {
        const data: Array<ShowResponse> = await ShowDAO.findMany(query);
        // Do logging, validation, and mapping here
        logger.debug(data);
        return data;
    }

    static async findOne(query: ShowQuery): Promise<ShowDetailResponse> {
        const data: ShowDetailResponse | null = await ShowDAO.findOne(query);
        if (!data) throw new NonExistentResourceError(
            `Resource does not exist - show:${JSON.stringify(query)}`
        );
        // Do logging, validation, and mapping here
        return data;
    }
}
