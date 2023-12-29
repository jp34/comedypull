import { Request, Response, NextFunction } from "express";
import { ShowDTO, ShowFilter, ShowQuery, InvalidInputError } from "../domain";
import { findShows, findShow } from "../services";
import { resolveActForShow, resolveVenueForShow } from "../services/resolver.service";
import logger from "../../../config/logger";

const parseShowFilter = (queryObj: any): ShowFilter => {
    const filter: ShowFilter = {};
    if (queryObj.id) filter.id = queryObj.id;
    if (queryObj.url) filter.url = queryObj.url;
    if (queryObj.actId) filter.actId = queryObj.actId;
    if (queryObj.venueId) filter.venueId = queryObj.venueId;
    if (queryObj.name) filter.name = queryObj.name;
    if (queryObj.dateStart) filter.dateStart = queryObj.dateStart;
    if (queryObj.timezone) filter.timezone = queryObj.timezone;
    if (queryObj.locale) filter.locale = queryObj.locale;
    if (queryObj.version) filter.version = queryObj.version;
    return filter;
}

const parseShowQuery = (queryObj: any): ShowQuery => {
    const query: ShowQuery = {
        filter: parseShowFilter(queryObj),
        paginate: {
            size: queryObj.size,
            page: queryObj.page
        },
        location: {
            latitude: queryObj.latitude,
            longitude: queryObj.longitude
        },
        populate: {
            acts: (queryObj.acts === "true") ? true : false,
            venues: (queryObj.venues === "true") ? true : false
        }
    };
    return query;
}

export const getMany = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
        const query: ShowQuery = parseShowQuery(request.query);
        logger.info(JSON.stringify(query));
        const data: ShowDTO[] = await findShows(query.filter, query.paginate?.size, query.paginate?.page);
        response.status(200).json({ data });
        next();
    } catch (err: any) {
        next(err);
    }
}

export const getOne = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
        const query: ShowQuery = parseShowQuery(request.query);
        const id: string = request.params.id;
        if (!id) throw new InvalidInputError("id");
        var data: ShowDTO = await findShow({ id });
        if (query.populate?.acts) data = await resolveActForShow(data);
        if (query.populate?.venues) data = await resolveVenueForShow(data);
        response.status(200).json({ data });
        next();
    } catch (err: any) {
        next(err);
    }
}
