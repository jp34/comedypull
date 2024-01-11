import { Request, Response, NextFunction } from "express";
import { findShows, findShowDetails } from "../../../services";
import {
    ShowQuery,
    parseShowQuery,
    ShowResponse,
    ShowDetailResponse,
    InvalidInputError
} from "../../../domain";

export const getShows = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
        const query: ShowQuery = parseShowQuery(request.query);
        const data: Array<ShowResponse> = await findShows(query);
        response.status(200).json(data);
        next();
    } catch (err: any) {
        next(err);
    }
}

export const getShowDetails = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
        const query: ShowQuery = parseShowQuery(request.query);
        const id: string = request.params.id;
        if (!id) throw new InvalidInputError("id");
        var data: ShowDetailResponse = await findShowDetails({ filter: { id }});
        response.status(200).json(data);
        next();
    } catch (err: any) {
        next(err);
    }
}
