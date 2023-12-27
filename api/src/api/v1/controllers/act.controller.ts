import { Request, Response, NextFunction } from "express";
import { Act, InvalidInputError } from "../domain";
import { findActs, findActById } from "../services/act.service";

export const getMany = async (request: Request, response: Response, next: NextFunction) => {
    try {
        let data: Act[] = await findActs();
        response.status(200).json({ data });
        next();
    } catch (err: any) {
        next(err);
    }
}

export const getOne = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id: string = request.params.id;
        if (!id) throw new InvalidInputError("id");
        let data: Act = await findActById(id);
        response.status(200).json({ data });
        next();
    } catch (err: any) {
        next(err);
    }
}
