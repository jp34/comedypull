import { Request, Response, NextFunction } from "express";
import { VenueService } from "../services";
import {
    VenueQuery,
    mapToVenueQuery,
    VenueResponse,
    VenueDetailResponse,
    InvalidInputError
} from "../models";

export class VenueController {

    /**
     * GET /
     * 
     * Sends a JSON response of many venues that matched the request query.
     * 
     * @param request Express Request
     * @param response Express Response
     * @param next Next middleware function
     */
    static async getVenues(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            const query: VenueQuery = mapToVenueQuery(request.params);
            const data: Array<VenueResponse> = await VenueService.findMany(query);
            response.status(200).json(data);
            next();
        } catch (err: any) {
            next(err);
        }
    }

    /**
     * GET /:id
     * 
     * Sends a detailed JSON response of the requested venue. If no venue can be found
     * with the provided id, this will return a NonExistentResourceError.
     * 
     * @param request Express Request 
     * @param response Express Response
     * @param next Next middleware function
     */
    static async getVenueDetails(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            const params: VenueQuery = mapToVenueQuery(request.query);
            const id: string = request.params.id;
            if (!id) throw new InvalidInputError("id");
            var data: VenueDetailResponse = await VenueService.findOne({ filter: { id }});
            response.status(200).json(data);
            next();
        } catch (err: any) {
            next(err);
        }
    }
}
