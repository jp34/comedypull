import { Request, Response, NextFunction } from "express";
import { updateDatabase } from "../../../services";

export const startProcess = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
        const command: string = request.params.command;
        switch (command) {
            case "update": {
                response.status(200).send();
                await updateDatabase();
            }
        }
        next();
    } catch (err: any) {
        next(err);
    }
}
