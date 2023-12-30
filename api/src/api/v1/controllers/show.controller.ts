import { Request, Response, NextFunction } from "express";
import { ShowDTO, ShowQuery, parseShowQuery, InvalidInputError } from "../domain";
import { findManyShows, findOneShow } from "../services";
import { resolveActForShow, resolveVenueForShow } from "../services/resolver.service";

export const getManyShows = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
        const query: ShowQuery = parseShowQuery(request.query);
        const data: ShowDTO[] = await findManyShows(query);
        response.status(200).json({ data });
        next();
    } catch (err: any) {
        next(err);
    }
}

export const getOneShow = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
        const query: ShowQuery = parseShowQuery(request.query);
        const id: string = request.params.id;
        if (!id) throw new InvalidInputError("id");
        var data: ShowDTO = await findOneShow({ id });
        if (query.populate?.acts) data = await resolveActForShow(data);
        if (query.populate?.venues) data = await resolveVenueForShow(data);
        response.status(200).json({ data });
        next();
    } catch (err: any) {
        next(err);
    }
}
