import { Request, Response, NextFunction } from "express";
import { ShowDTO, ShowFilter, ShowQuery, InvalidInputError } from "../domain";
import { findShows, findShow } from "../services";
import { resolveActForShow, resolveVenueForShow } from "../services/resolver.service";

const mapToShowQuery = (query: any): ShowQuery => {
    const filterObj: ShowFilter = {};
    if (query.id) filterObj.id = query.id;
    if (query.url) filterObj.url = query.url;
    if (query.actId) filterObj.actId = query.actId;
    if (query.venueId) filterObj.venueId = query.venueId;
    if (query.name) filterObj.name = query.name;
    if (query.dateStart) filterObj.dateStart = query.dateStart;
    if (query.timezone) filterObj.timezone = query.timezone;
    if (query.locale) filterObj.locale = query.locale;
    if (query.version) filterObj.version = query.version;
    const queryObj: ShowQuery = {
        filter: filterObj,
        populate: {
            acts: query.shows,
            venues: query.venues,
        },
        size: query.size,
        page: query.page
    };
    return queryObj;
}

export const getMany = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
        const query: ShowQuery = mapToShowQuery(request.params);
        const data: ShowDTO[] = await findShows(query);
        response.status(200).json({ data });
        next();
    } catch (err: any) {
        next(err);
    }
}

export const getOne = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
        const query: ShowQuery = mapToShowQuery(request.query);
        const id: string = request.params.id;
        if (!id) throw new InvalidInputError("id");
        var data: ShowDTO = await findShow({ filter: { id }});
        if (query.populate?.acts) data = await resolveActForShow(data);
        if (query.populate?.venues) data = await resolveVenueForShow(data);
        response.status(200).json({ data });
        next();
    } catch (err: any) {
        next(err);
    }
}
