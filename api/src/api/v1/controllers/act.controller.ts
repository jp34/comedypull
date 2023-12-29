import { Request, Response, NextFunction } from "express";
import { ActDTO, ActFilter, ActQuery, InvalidInputError } from "../domain";
import { findActs, findAct } from "../services/act.service";
import { resolveShowsForAct } from "../services/resolver.service";

const parseActFilter = (queryObj: any): ActFilter => {
    const filter: ActFilter = {};
    if (queryObj.id) filter.id = queryObj.id;
    if (queryObj.url) filter.url = queryObj.url;
    if (queryObj.name) filter.name = queryObj.name;
    if (queryObj.relevance) filter.relevance = queryObj.relevance;
    if (queryObj.locale) filter.locale = queryObj.locale;
    if (queryObj.version) filter.version = queryObj.version;
    return filter;
}

const parseActQuery = (queryObj: any): ActQuery => {
    const query: ActQuery = {
        filter: parseActFilter(queryObj),
        paginate: {
            size: queryObj.size,
            page: queryObj.page
        },
        populate: {
            shows: (queryObj.shows === "true") ? true : false
        }
    };
    return query;
}

export const getMany = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
        const query: ActQuery = parseActQuery(request.query);
        const data: ActDTO[] = await findActs(query);
        response.status(200).json({ data });
        next();
    } catch (err: any) {
        next(err);
    }
}

export const getOne = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
        const query: ActQuery = parseActQuery(request.query);
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
