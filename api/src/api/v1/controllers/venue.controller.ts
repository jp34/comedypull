import { Request, Response, NextFunction } from "express";
import { findVenues, findVenueDetails } from "../../../services";
import {
    VenueQuery,
    parseVenueQuery,
    VenueResponse,
    VenueDetailResponse,
    InvalidInputError
} from "../../../domain";

export const getVenues = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
        const query: VenueQuery = parseVenueQuery(request.params);
        const data: Array<VenueResponse> = await findVenues(query);
        response.status(200).json(data);
        next();
    } catch (err: any) {
        next(err);
    }
}

export const getVenueDetails = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
        const params: VenueQuery = parseVenueQuery(request.query);
        const id: string = request.params.id;
        if (!id) throw new InvalidInputError("id");
        var data: VenueDetailResponse = await findVenueDetails({ filter: { id }});
        response.status(200).json(data);
        next();
    } catch (err: any) {
        next(err);
    }
}
