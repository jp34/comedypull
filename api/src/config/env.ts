import dotenv from "dotenv";
dotenv.config();
import logger from "./logger";
import { ConfigurationError } from "../models/error";

// DEBUG : Run in debug mode
const DEBUG = process.env.DEBUG ?? "undefined";
if (DEBUG === "undefined") throw new ConfigurationError("Missing environment variable: DEBUG");
logger.debug(`DEBUG: ${DEBUG}`);

// HOST : Host the server is running on
const HOST = process.env.HOST ?? "undefined";
if (HOST === "undefined") throw new ConfigurationError("Missing environment variable: HOST");
logger.debug(`HOST: ${HOST}`);

// PORT : Port to start server on
const PORT = process.env.PORT ?? "undefined";
if (PORT === "undefined") throw new ConfigurationError("Missing environment variable: PORT");
logger.debug(`PORT: ${PORT}`);

// DB_STRING : MongoDB connection string
const DB_STRING = process.env.BACKEND_DB_STRING ?? "undefined";
if (DB_STRING === "undefined") throw new ConfigurationError("Missing environment variable: DB_STRING");
logger.debug(`DB_STRING: ${DB_STRING}`);

const Env = {
    DEBUG,
    HOST,
    PORT,
    DB_STRING
};

export default Env;