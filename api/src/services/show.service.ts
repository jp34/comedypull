import {
    ShowDAO,
    ShowQuery,
    ShowResponse,
    ShowDetailResponse,
    NonExistentResourceError
} from "../models";
import { NearbyQuery } from "../models";

/**
 * Defines various static methods that implement business and CRUD operations
 * related to the Show entity.
 */
export class ShowService {

    static async findNearby(query: NearbyQuery): Promise<Array<ShowResponse>> {
        const data: Array<ShowResponse> = await ShowDAO.findNearby(query);
        // Do logging, validation, and mapping here
        return data;
    }

    /**
     * Returns an array of Shows matching the provided query. Objects are mapped
     * to type ShowResponse. Should perform various validation, cleansing, and security
     * tasks.
     * 
     * @param query ShowQuery
     * @returns Array of ShowResponse
     */
    static async findMany(query: ShowQuery): Promise<Array<ShowResponse>> {
        const data: Array<ShowResponse> = await ShowDAO.findMany(query);
        // Do logging, validation, and mapping here
        return data;
    }

    /**
     * Returns a detailed response for a single Show entity. Response object is mapped
     * to type ShowDetailResponse. Should perform various validation, cleansing, and
     * security tasks.
     * 
     * @param query ShowQuery
     * @returns ShowDetailResponse
     */
    static async findOne(query: ShowQuery): Promise<ShowDetailResponse> {
        const data: ShowDetailResponse | null = await ShowDAO.findOne(query);
        if (!data) throw new NonExistentResourceError(
            `Resource does not exist - show:${JSON.stringify(query)}`
        );
        // Do logging, validation, and mapping here
        return data;
    }
}
