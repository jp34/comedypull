import dotenv from "dotenv";
dotenv.config();
import logger from "./logger";
import { ConfigurationError } from "../app/models";

// DEBUG : Run in debug mode
const DEBUG = process.env.DEBUG ?? "undefined";
if (DEBUG === "undefined") throw new ConfigurationError("Missing environment variable: DEBUG");
logger.debug(`DEBUG: ${DEBUG}`);

// DB_STRING : MongoDB connection string
const DB_STRING = process.env.DB_STRING ?? "undefined";
if (DB_STRING === "undefined") throw new ConfigurationError("Missing environment variable: DB_STRING");
logger.debug(`DB_STRING: ${DB_STRING}`);

// TM_API_KEY : TicketMaster api key
const TM_API_KEY = process.env.TM_API_KEY ?? "undefined";
if (TM_API_KEY === "undefined") throw new Error("Missing environment variable: TM_API_KEY");
logger.debug(`TM_API_KEY: ${TM_API_KEY}`);

// TM_ATTRACTIONS_URL : TicketMaster api url
const TM_ATTRACTIONS_URL = process.env.TM_ATTRACTIONS_URL ?? "undefined";
if (TM_ATTRACTIONS_URL === "undefined") throw new Error("Missing environment variable: TM_ATTRACTIONS_URL");
logger.debug(`TM_ATTRACTIONS_URL: ${TM_ATTRACTIONS_URL}`);

// TM_EVENTS_URL : TicketMaster api url
const TM_EVENTS_URL = process.env.TM_EVENTS_URL ?? "undefined";
if (TM_EVENTS_URL === "undefined") throw new Error("Missing environment variable: TM_EVENTS_URL");
logger.debug(`TM_EVENTS_URL: ${TM_EVENTS_URL}`);

// TM_SUBGENRE_ID : TicketMaster subgenre ID (Individual, Comedian)
const TM_SUBGENRE_ID = process.env.TM_SUBGENRE_ID ?? "undefined";
if (TM_SUBGENRE_ID === "undefined") throw new Error("Missing environment variable: TM_SUBGENRE_ID");
logger.debug(`TM_SUBGENRE_ID: ${TM_SUBGENRE_ID}`);

const Env = {
    DEBUG,
    DB_STRING,
    TM_API_KEY,
    TM_SUBGENRE_ID,
    TM_ATTRACTIONS_URL,
    TM_EVENTS_URL
};

export default Env;