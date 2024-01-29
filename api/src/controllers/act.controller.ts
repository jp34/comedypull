import { Request, Response, NextFunction } from "express";
import { ActService } from "../services";
import {
    ActQuery,
    parseActQuery,
    ActResponse,
    ActDetailResponse,
    InvalidInputError
} from "../models";

/**
 * GET /
 * 
 * Sends a JSON response of many acts that matched the request query.
 * 
 * @param request Express Request
 * @param response Express Response
 * @param next Next middleware function
 */
export const getManyActs = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
        const query: ActQuery = parseActQuery(request.query);
        const data: Array<ActResponse> = await ActService.findMany(query);
        response.status(200).json(data);
        next();
    } catch (err: any) {
        next(err);
    }
}

/**
 * GET /:id
 * 
 * Sends a detailed JSON response of the requested act. If no act can be found
 * with the provided id, this will return a NonExistentResourceError.
 * 
 * @param request Express Request 
 * @param response Express Response
 * @param next Next middleware function
 */
export const getOneAct = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
        const query: ActQuery = parseActQuery(request.query);
        const id: string = request.params.id;
        if (!id) throw new InvalidInputError("id");
        var data: ActDetailResponse = await ActService.findOne({ filter: { id }});
        response.status(200).json(data);
        next();
    } catch (err: any) {
        next(err);
    }
}
