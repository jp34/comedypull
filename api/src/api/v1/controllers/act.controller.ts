import { Request, Response, NextFunction } from "express";
import { ActDTO, ActSearchParams, InvalidInputError } from "../domain";
import { findActs, findAct } from "../services/act.service";
import { resolveShowsForAct } from "../services/resolver.service";

const mapToActSearchParams = (params: any): ActSearchParams => {
    const searchParams: ActSearchParams = {
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
        const params: ActSearchParams = mapToActSearchParams(request.params);
        const data: ActDTO[] = await findActs(params);
        response.status(200).json({ data });
        next();
    } catch (err: any) {
        next(err);
    }
}

export const getOne = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
        const params: ActSearchParams = mapToActSearchParams(request.query);
        const id: string = request.params.id;
        if (!id) throw new InvalidInputError("id");
        var data: ActDTO = await findAct({ filter: { id }});
        if (params.populate?.shows) data = await resolveShowsForAct(data);
        response.status(200).json({ data });
        next();
    } catch (err: any) {
        next(err);
    }
}
