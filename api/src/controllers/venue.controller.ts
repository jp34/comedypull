import { Request, Response, NextFunction } from "express";
import { VenueService } from "../services";
import {
    VenueQuery,
    parseVenueQuery,
    VenueResponse,
    VenueDetailResponse,
    InvalidInputError
} from "../models";

/**
 * GET /
 * 
 * Sends a JSON response of many venues that matched the request query.
 * 
 * @param request Express Request
 * @param response Express Response
 * @param next Next middleware function
 */
export const getVenues = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
        const query: VenueQuery = parseVenueQuery(request.params);
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
export const getVenueDetails = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
        const params: VenueQuery = parseVenueQuery(request.query);
        const id: string = request.params.id;
        if (!id) throw new InvalidInputError("id");
        var data: VenueDetailResponse = await VenueService.findOne({ filter: { id }});
        response.status(200).json(data);
        next();
    } catch (err: any) {
        next(err);
    }
}
