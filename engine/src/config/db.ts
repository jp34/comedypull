import Env from "./env";
import mongoose from "mongoose";
import logger from "./logger";

export const connect = async () => {
    mongoose.set('strictQuery', false);
    await mongoose.connect(Env.DB_STRING).then(() => {
        logger.info('Successfully connected to database', {
            uri: Env.DB_STRING,
            timestamp: Date.now()
        });
    }).catch((err: any) => {
        logger.warn('Failed to connect to database', {
            cause: err.message,
            timestamp: Date.now()
        });
        throw new Error('Failed to connect to database');
    });
}

export const disconnect = async () => {
    await mongoose.disconnect().then(() => {
        logger.info('Successfully disconnected from database', {
            timestamp: Date.now()
        });
    }).catch((err: any) => {
        logger.warn('Failed to disconnect from database', {
            cause: err.message,
            timestamp: Date.now()
        });
        throw new Error('Failed to disconnect from database');
    });
}
