import { Request, Response, NextFunction } from "express";
import { VenueDTO, VenueSearchParams, InvalidInputError } from "../domain";
import { findVenues, findVenue } from "../services";

const mapToVenueSearchParams = (params: any): VenueSearchParams => {
    const searchParams: VenueSearchParams = {
        filter: {
            id: params.id ?? undefined,
            url: params.url ?? undefined,
            name: params.name ?? undefined,
            locale: params.locale ?? undefined,
            version: params.version ?? undefined
        },
        populate: {
            shows: params.shows ?? undefined
        },
        size: params.size ?? undefined,
        page: params.page ?? undefined
    };
    return searchParams;
}

export const getMany = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
        const params: VenueSearchParams = mapToVenueSearchParams(request.params);
        const data: VenueDTO[] = await findVenues(params);
        response.status(200).json({ data });
        next();
    } catch (err: any) {
        next(err);
    }
}

export const getOne = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
        const params: VenueSearchParams = mapToVenueSearchParams(request.params);
        const id: string = request.params.id;
        if (!id) throw new InvalidInputError("id");
        const data: VenueDTO = await findVenue({ filter: { id }});
        response.status(200).json({ data });
        next();
    } catch (err: any) {
        next(err);
    }
}
