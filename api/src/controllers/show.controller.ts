import { Request, Response, NextFunction } from "express";
import { ShowService } from "../services";
import {
    ShowQuery,
    parseShowQuery,
    ShowResponse,
    ShowDetailResponse,
    InvalidInputError
} from "../models";

/**
 * GET /
 * 
 * Sends a JSON response of many shows that matched the request query.
 * 
 * @param request Express Request
 * @param response Express Response
 * @param next Next middleware function
 */
export const getShows = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
        const query: ShowQuery = parseShowQuery(request.query);
        const data: Array<ShowResponse> = await ShowService.findMany(query);
        response.status(200).json(data);
        next();
    } catch (err: any) {
        next(err);
    }
}

/**
 * GET /:id
 * 
 * Sends a detailed JSON response of the requested show. If no show can be found
 * with the provided id, this will return a NonExistentResourceError.
 * 
 * @param request Express Request 
 * @param response Express Response
 * @param next Next middleware function
 */
export const getShowDetails = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
        const query: ShowQuery = parseShowQuery(request.query);
        const id: string = request.params.id;
        if (!id) throw new InvalidInputError("id");
        var data: ShowDetailResponse = await ShowService.findOne({ filter: { id }});
        response.status(200).json(data);
        next();
    } catch (err: any) {
        next(err);
    }
}
