import {
    ActDAO,
    ActQuery,
    ActResponse,
    ActDetailResponse,
    NonExistentResourceError
} from "../models";

/**
 * Defines various static methods that implement business and CRUD operations
 * related to the Act entity.
 */
export class ActService {

    /**
     * Returns an array of Acts matching the provided query. Objects are mapped
     * to type ActResponse. Should perform various validation, cleansing, and security
     * tasks.
     * 
     * @param query ActQuery
     * @returns Array of ActResponse
     */
    static async findMany(query: ActQuery): Promise<Array<ActResponse>> {
        const data: Array<ActResponse> = await ActDAO.findMany(query);
        // Do logging, validation, and mapping here
        return data;
    }

    /**
     * Returns a detailed response for a single Show entity. Response object is mapped
     * to type ShowDetailResponse. Should perform various validation, cleansing, and
     * security tasks.
     * 
     * @param query ActQuery
     * @returns ActDetailResponse
     */
    static async findOne(query: ActQuery): Promise<ActDetailResponse> {
        const data: ActDetailResponse | null = await ActDAO.findOne(query);
        if (!data) throw new NonExistentResourceError(
            `Resource does not exist - act:${JSON.stringify(query)}`
        );
        // Do logging, validation, and mapping here
        return data;
    }
}
