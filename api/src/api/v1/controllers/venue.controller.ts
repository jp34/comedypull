import { Request, Response, NextFunction } from "express";
import { VenueDTO, VenueFilter, VenueQuery, InvalidInputError } from "../domain";
import { findVenues, findVenue } from "../services";
import { resolveShowsForVenue } from "../services/resolver.service";

const mapToVenueQuery = (query: any): VenueQuery => {
    const filterObj: VenueFilter = {};
    if (query.id) filterObj.id = query.id;
    if (query.url) filterObj.url = query.url;
    if (query.name) filterObj.name = query.name;
    if (query.locale) filterObj.locale = query.locale;
    if (query.version) filterObj.version = query.version;
    const queryObj: VenueQuery = {
        filter: filterObj,
        populate: {
            shows: query.shows ?? undefined
        },
        size: query.size ?? undefined,
        page: query.page ?? undefined
    };
    return queryObj;
}

export const getMany = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
        const query: VenueQuery = mapToVenueQuery(request.params);
        const data: VenueDTO[] = await findVenues(query);
        response.status(200).json({ data });
        next();
    } catch (err: any) {
        next(err);
    }
}

export const getOne = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
        const params: VenueQuery = mapToVenueQuery(request.query);
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
