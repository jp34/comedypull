import {
    VenueDAO,
    VenueQuery,
    VenueResponse,
    VenueDetailResponse,
    NonExistentResourceError,
} from "../models";

/**
 * Defines various static methods that implement business and CRUD operations
 * related to the Venue entity.
 */
export class VenueService {

    /**
     * Returns an array of Venues matching the provided query. Objects are mapped
     * to type VenueResponse. Should perform various validation, cleansing, and security
     * tasks.
     * 
     * @param query VenueQuery
     * @returns Array of VenueResponse
     */
    static async findMany(query: VenueQuery): Promise<Array<VenueResponse>> {
        const data: Array<VenueResponse> = await VenueDAO.findMany(query);
        // Do logging, validation, and mapping here
        return data;
    }

    /**
     * Returns a detailed response for a single Venue entity. Response object is mapped
     * to type VenueDetailResponse. Should perform various validation, cleansing, and
     * security tasks.
     * 
     * @param query VenueQuery
     * @returns VenueDetailResponse
     */
    static async findOne(query: VenueQuery): Promise<VenueDetailResponse> {
        const data: VenueDetailResponse | null = await VenueDAO.findOne(query);
        if (!data) throw new NonExistentResourceError(
            `Resource does not exist - show:${JSON.stringify(query.filter)}`
        );
        // Do logging, validation, and mapping here
        return data;
    }
}
