import Env from "./env";
import mongoose from "mongoose";
import logger from "./logger";

export const connect = () => {
    mongoose.set('strictQuery', false);
    mongoose.connect(Env.DB_STRING).then(() => {
        logger.info('Connected to MongoDB');
    }).catch((err) => {
        logger.warn(err.message);
        throw new Error('Failed to connect to database');
    });
}
