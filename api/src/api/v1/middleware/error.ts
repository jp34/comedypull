import { Request, Response, NextFunction } from "express";
import { ConfigurationError, InvalidInputError, NonExistentResourceError } from "../../../domain";
import logger from "../../../config/logger";

export const errorHandler = async (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof NonExistentResourceError) {
        logger.warn("NonExistentResourceError", {
            cause: error.message,
            stack: error.stack
        });
        response.status(404).json({ error: error.message });
    } else if (error instanceof InvalidInputError) {
        logger.warn("InvalidInputError", {
            cause: error.message,
            stack: error.stack
        });
        response.status(400).json({ error: error.message });
    } else if (error instanceof ConfigurationError) {
        logger.warn('ConfigurationError', {
            cause: error.message,
            stack: error.stack
        });
        response.status(500).send();
    } else {
        logger.warn("Unknown Error", {
            cause: error.message,
            stack: error.stack
        });
        response.status(500).send();
    }
    next();
}
