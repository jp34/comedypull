import { Request, Response, NextFunction } from "express";
import { VenueDTO, VenueQuery, parseVenueQuery, InvalidInputError } from "../domain";
import { findManyVenues, findOneVenue } from "../services";
import { resolveShowsForVenue } from "../services/resolver.service";

export const getManyVenues = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
        const query: VenueQuery = parseVenueQuery(request.params);
        const data: VenueDTO[] = await findManyVenues(query);
        response.status(200).json({ data });
        next();
    } catch (err: any) {
        next(err);
    }
}

export const getOneVenue = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
        const params: VenueQuery = parseVenueQuery(request.query);
        const id: string = request.params.id;
        if (!id) throw new InvalidInputError("id");
        var data: VenueDTO = await findOneVenue({ filter: { id }});
        if (params.populate?.shows) data = await resolveShowsForVenue(data);
        response.status(200).json({ data });
        next();
    } catch (err: any) {
        next(err);
    }
}
