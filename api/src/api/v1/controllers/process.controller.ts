import { Request, Response, NextFunction } from "express";
import { InvalidInputError } from "../models";
import { UpdateService } from "../services";

export const startProcess = async (request: Request, response: Response, next: NextFunction) => {
    try {
        let processName: string = request.params.name;
        if (!processName) throw new InvalidInputError("name");
        switch (processName) {
            case "update":
                await UpdateService.start();
                break;
            
            default:
                throw new InvalidInputError("name");
        }
        response.status(200);
        next();
    } catch (err: any) {
        next(err);
    }
}
