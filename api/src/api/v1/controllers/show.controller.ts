import { Request, Response, NextFunction } from "express";
import { ShowDTO, ShowSearchParams, InvalidInputError } from "../domain";
import { findShows, findShow } from "../services";
import { resolveActForShow, resolveVenueForShow } from "../services/resolver.service";

const mapToShowSearchParams = (params: any): ShowSearchParams => {
    const searchParams: ShowSearchParams = {
        filter: {
            id: params.id ?? undefined,
            url: params.url ?? undefined,
            actId: params.actId ?? undefined,
            venueId: params.venueId ?? undefined,
            name: params.name ?? undefined,
            dateStart: params.dateStart ?? undefined,
            timezone: params.timezone ?? undefined,
            locale: params.locale ?? undefined,
            version: params.version ?? undefined
        },
        populate: {
            acts: params.shows ?? undefined,
            venues: params.venues ?? undefined,
        },
        size: params.size ?? undefined,
        page: params.page ?? undefined
    };
    return searchParams;
}

export const getMany = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
        const params: ShowSearchParams = mapToShowSearchParams(request.params);
        const data: ShowDTO[] = await findShows(params);
        response.status(200).json({ data });
        next();
    } catch (err: any) {
        next(err);
    }
}

export const getOne = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
        const params: ShowSearchParams = mapToShowSearchParams(request.query);
        const id: string = request.params.id;
        if (!id) throw new InvalidInputError("id");
        var data: ShowDTO = await findShow({ filter: { id }});
        if (params.populate?.acts) data = await resolveActForShow(data);
        if (params.populate?.venues) data = await resolveVenueForShow(data);
        response.status(200).json({ data });
        next();
    } catch (err: any) {
        next(err);
    }
}
