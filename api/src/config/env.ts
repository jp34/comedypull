import dotenv from "dotenv";
dotenv.config();
import logger from "./logger";
import { ConfigurationError } from "../api/v1/models";

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
const DB_STRING = process.env.DB_STRING ?? "undefined";
if (DB_STRING === "undefined") throw new ConfigurationError("Missing environment variable: DB_STRING");
logger.debug(`DB_STRING: ${DB_STRING}`);

// TM_API_KEY : TicketMaster api key
const TM_API_KEY = process.env.TM_API_KEY ?? "undefined";
if (TM_API_KEY === "undefined") throw new Error("Missing environment variable: TM_API_KEY");
logger.debug(`API_KEY: ${TM_API_KEY}`);

// TM_ATTRACTIONS_URL : TicketMaster api url
const TM_ATTRACTIONS_URL = process.env.TM_ATTRACTIONS_URL ?? "undefined";
if (TM_ATTRACTIONS_URL === "undefined") throw new Error("Missing environment variable: TM_ATTRACTIONS_URL");
logger.debug(`TM_ATTRACTIONS_URL: ${TM_ATTRACTIONS_URL}`);

// TM_EVENTS_URL : TicketMaster api url
const TM_EVENTS_URL = process.env.TM_EVENTS_URL ?? "undefined";
if (TM_EVENTS_URL === "undefined") throw new Error("Missing environment variable: TM_EVENTS_URL");
logger.debug(`TM_EVENTS_URL: ${TM_EVENTS_URL}`);

const Env = {
    DEBUG,
    HOST,
    PORT,
    DB_STRING,
    TM_API_KEY,
    TM_ATTRACTIONS_URL,
    TM_EVENTS_URL
};

export default Env;