import { Request, Response, NextFunction } from "express";
import { ShowService, VenueService } from "../services";
import { NearbyQuery, ShowResponse, VenueResponse, mapToNearbyQuery } from "../models";

export class NearbyController {

    static async getNearbyShows(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            const query: NearbyQuery = mapToNearbyQuery(request.query);
            const data: Array<ShowResponse> = await ShowService.findNearby(query);
            response.status(200).json(data);
            next();
        } catch (err: any) {
            next(err);
        }
    }

    static async getNearbyVenues(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            const query: NearbyQuery = mapToNearbyQuery(request.query);
            const data: Array<VenueResponse> = await VenueService.findNearby(query);
            response.status(200).json(data);
            next();
        } catch (err: any) {
            next(err);
        }
    }
}
