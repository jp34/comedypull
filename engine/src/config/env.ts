import dotenv from "dotenv";
dotenv.config();
import logger from "./logger";

// DEBUG : Run in debug mode
const DEBUG = process.env.DEBUG ?? "undefined";
if (DEBUG === "undefined") throw new Error("Missing environment variable: DEBUG");
logger.debug(`DEBUG: ${DEBUG}`);

// ENGINE_DB_STRING : MongoDB connection string
const DB_STRING = process.env.ENGINE_DB_STRING ?? "undefined";
if (DB_STRING === "undefined") throw new Error("Missing environment variable: ENGINE_DB_STRING");
logger.debug(`DB_STRING: ${DB_STRING}`);

// TM_ATTRACTIONS_URL : TicketMaster api url
const TM_ATTRACTIONS_URL = process.env.TM_ATTRACTIONS_URL ?? "undefined";
if (TM_ATTRACTIONS_URL === "undefined") throw new Error("Missing environment variable: TM_ATTRACTIONS_URL");
logger.debug(`TM_ATTRACTIONS_URL: ${TM_ATTRACTIONS_URL}`);

// TM_API_KEY : TicketMaster api key
const TM_API_KEY = process.env.TM_API_KEY ?? "undefined";
if (TM_API_KEY === "undefined") throw new Error("Missing environment variable: TM_API_KEY");
logger.debug(`API_KEY: ${TM_API_KEY}`);

// ENGINE_ACT_COUNT_CUTOFF : Check ticketmaster for top (N) most relevant acts
const ACT_COUNT_CUTOFF = process.env.ENGINE_ACT_COUNT_CUTOFF ?? "undefined";
if (ACT_COUNT_CUTOFF === "undefined") throw new Error("Missing environment variable: ENGINE_ACT_COUNT_CUTOFF");
logger.debug(`ACT_COUNT_CUTOFF: ${ACT_COUNT_CUTOFF}`);

const Env = {
    DEBUG,
    DB_STRING,
    TM_ATTRACTIONS_URL,
    TM_API_KEY,
    ACT_COUNT_CUTOFF: parseInt(ACT_COUNT_CUTOFF)
};

export default Env;