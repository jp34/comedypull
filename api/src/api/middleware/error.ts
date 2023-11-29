import { Request, Response, NextFunction } from "express";
import { ConfigurationError } from "../../entity/error";
import logger from "../../config/logger";

export const errorHandler = async (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof ConfigurationError) {
        logger.warn('ConfigurationError', {
            cause: error.message,
            ip: request.ip,
            timestamp: Date.now()
        });
    } else {
        logger.warn('Unknown Error', {
            cause: error.message,
            ip: request.ip,
            timestamp: Date.now()
        });
    }
    next();
}
