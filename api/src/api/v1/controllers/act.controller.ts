import { Request, Response, NextFunction } from "express";
import { ActDTO, ActQuery, parseActQuery, InvalidInputError } from "../../../domain";
import { findManyActs, findOneAct } from "../../../services/act.service";
import { resolveShowsForAct } from "../../../services";

export const getManyActs = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
        const query: ActQuery = parseActQuery(request.query);
        const data: ActDTO[] = await findManyActs(query);
        response.status(200).json({ data });
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
        var data: ActDTO = await findOneAct({ filter: { id }});
        if (query.populate?.shows) data = await resolveShowsForAct(data);
        response.status(200).json({ data });
        next();
    } catch (err: any) {
        next(err);
    }
}
