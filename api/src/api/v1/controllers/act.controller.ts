import { Request, Response, NextFunction } from "express";
import { ActDTO, ActFilter, ActQuery, InvalidInputError } from "../domain";
import { findActs, findAct } from "../services/act.service";
import { resolveShowsForAct } from "../services/resolver.service";

const mapToActQuery = (query: any): ActQuery => {
    const filterObj: ActFilter = {};
    if (query.id) filterObj.id = query.id;
    if (query.url) filterObj.url = query.url;
    if (query.name) filterObj.name = query.name;
    if (query.locale) filterObj.locale = query.locale;
    if (query.version) filterObj.version = query.version;
    const queryObj: ActQuery = {
        filter: filterObj,
        populate: {
            shows: (query.shows === "true") ? true : false
        },
        size: query.size,
        page: query.page
    };
    return queryObj;
}

export const getMany = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
        const query: ActQuery = mapToActQuery(request.query);
        const data: ActDTO[] = await findActs(query);
        response.status(200).json({ data });
        next();
    } catch (err: any) {
        next(err);
    }
}

export const getOne = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
        const query: ActQuery = mapToActQuery(request.query);
        const id: string = request.params.id;
        if (!id) throw new InvalidInputError("id");
        var data: ActDTO = await findAct({ filter: { id }});
        if (query.populate?.shows) data = await resolveShowsForAct(data);
        response.status(200).json({ data });
        next();
    } catch (err: any) {
        next(err);
    }
}
