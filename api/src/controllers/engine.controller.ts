import { Request, Response, NextFunction } from "express";
import { updateDatabase } from "../services";

export class EngineController {

    /**
     * POST /:command
     * 
     * Receives a post request with a specific command name, allows engine processes
     * to be started via HTTP. Currently, "update" is the only supported command.
     * 
     * @param request Express Request
     * @param response Express Response
     * @param next Next middleware function
     */
    static async startProcess(request: Request, response: Response, next: NextFunction): Promise<void> {
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
}
