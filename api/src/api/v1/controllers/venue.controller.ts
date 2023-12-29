import { Request, Response, NextFunction } from "express";
import { VenueDTO, VenueFilter, VenueQuery, InvalidInputError } from "../domain";
import { findVenues, findVenue } from "../services";
import { resolveShowsForVenue } from "../services/resolver.service";

const parseVenueFilter = (queryObj: any): VenueFilter => {
    const filter: VenueFilter = {};
    if (queryObj.id) filter.id = queryObj.id;
    if (queryObj.url) filter.url = queryObj.url;
    if (queryObj.name) filter.name = queryObj.name;
    if (queryObj.locale) filter.locale = queryObj.locale;
    if (queryObj.version) filter.version = queryObj.version;
    return filter;
}

const parseVenueQuery = (queryObj: any): VenueQuery => {
    const query: VenueQuery = {
        filter: parseVenueFilter(queryObj),
        paginate: {
            size: queryObj.size,
            page: queryObj.page
        },
        location: {
            latitude: queryObj.latitude,
            longitude: queryObj.longitude
        },
        populate: {
            shows: (queryObj.shows === "true") ? true : false
        }
    };
    return query;
}

export const getMany = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
        const query: VenueQuery = parseVenueQuery(request.params);
        const data: VenueDTO[] = await findVenues(query);
        response.status(200).json({ data });
        next();
    } catch (err: any) {
        next(err);
    }
}

export const getOne = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
        const params: VenueQuery = parseVenueQuery(request.query);
        const id: string = request.params.id;
        if (!id) throw new InvalidInputError("id");
        var data: VenueDTO = await findVenue({ filter: { id }});
        if (params.populate?.shows) data = await resolveShowsForVenue(data);
        response.status(200).json({ data });
        next();
    } catch (err: any) {
        next(err);
    }
}
