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

// ENGINE_API_KEY : TicketMaster api key
const API_KEY = process.env.ENGINE_API_KEY ?? "undefined";
if (API_KEY === "undefined") throw new Error("Missing environment variable: ENGINE_API_KEY");
logger.debug(`API_KEY: ${API_KEY}`);

// ENGINE_ACT_COUNT_CUTOFF : Check ticketmaster for top (N) most relevant acts
const ACT_COUNT_CUTOFF = process.env.ENGINE_ACT_COUNT_CUTOFF ?? "undefined";
if (ACT_COUNT_CUTOFF === "undefined") throw new Error("Missing environment variable: ENGINE_ACT_COUNT_CUTOFF");
logger.debug(`ACT_COUNT_CUTOFF: ${ACT_COUNT_CUTOFF}`);

const Env = {
    DEBUG,
    API_KEY,
    DB_STRING,
    ACT_COUNT_CUTOFF: parseInt(ACT_COUNT_CUTOFF)
};

export default Env;