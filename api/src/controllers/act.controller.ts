import { Request, Response, NextFunction } from "express";
import { ActService } from "../services";
import {
    ActQuery,
    parseActQuery,
    ActResponse,
    ActDetailResponse,
    InvalidInputError
} from "../models";

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
