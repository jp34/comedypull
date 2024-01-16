import {
    VenueDAO,
    VenueQuery,
    VenueResponse,
    VenueDetailResponse,
    NonExistentResourceError,
} from "../models";
import { ShowService } from "./show.service";

export class VenueService {

    static async findMany(query: VenueQuery): Promise<Array<VenueResponse>> {
        const data: Array<VenueResponse> = await VenueDAO.findMany(query);
        // Do logging, validation, and mapping here
        return data;
    }

    static async findOne(query: VenueQuery): Promise<VenueDetailResponse> {
        const data: VenueDetailResponse | null = await VenueDAO.findOne(query);
        if (!data) throw new NonExistentResourceError(
            `Resource does not exist - show:${JSON.stringify(query.filter)}`
        );
        data.shows = await ShowService.findMany({ filter: { venue: data._id }});
        // Do logging, validation, and mapping here
        return data;
    }
}
