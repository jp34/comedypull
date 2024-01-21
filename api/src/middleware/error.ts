import { Request, Response, NextFunction } from "express";
import { ConfigurationError, InvalidInputError, NonExistentResourceError } from "../models";
import logger from "../config/logger";

/**
 * Defines an Express middleware function responsible for handling errors. Sends the appropriate
 * response for each possible error type. Logs the relevant error message and stack trace.
 * 
 * TODO - Record more relevant information (IP Address, Error origin, trace ID)
 * 
 * @param error Error from previous middleware function
 * @param request Express request object
 * @param response Express response object
 * @param next Next middleware function
 */
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
