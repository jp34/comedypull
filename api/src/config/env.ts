import dotenv from "dotenv";
dotenv.config();
import { ConfigurationError } from "../api/v1/domain";

// DEBUG : Run in debug mode
const DEBUG = process.env.DEBUG ?? "undefined";
if (DEBUG === "undefined") throw new ConfigurationError("Missing environment variable: DEBUG");

const LOG_LEVEL = process.env.LOG_LEVEL ?? "undefined";
if (LOG_LEVEL === "undefined") throw new ConfigurationError("Missing environment variable: LOG_LEVEL");

const LOG_DIR = process.env.LOG_DIR ?? "undefined";
if (LOG_DIR === "undefined") throw new ConfigurationError("Missing environment variable: LOG_DIR");

// HOST : Host the server is running on
const HOST = process.env.HOST ?? "undefined";
if (HOST === "undefined") throw new ConfigurationError("Missing environment variable: HOST");

// PORT : Port to start server on
const PORT = process.env.PORT ?? "undefined";
if (PORT === "undefined") throw new ConfigurationError("Missing environment variable: PORT");

// DB_STRING : MongoDB connection string
const DB_STRING = process.env.DB_STRING ?? "undefined";
if (DB_STRING === "undefined") throw new ConfigurationError("Missing environment variable: DB_STRING");

// API_NEARBY_LIMIT
const API_NEARBY_LIMIT = process.env.API_NEARBY_LIMIT ?? -1;
if (API_NEARBY_LIMIT == -1) throw new Error("Missing environment variable: API_NEARBY_LIMIT");

// ENGINE_RETRY_LIMIT
const ENGINE_RETRY_LIMIT = process.env.ENGINE_RETRY_LIMIT ?? -1;
if (ENGINE_RETRY_LIMIT == -1) throw new Error("Missing environment variable: ENGINE_RETRY_LIMIT");

// TM_API_KEY : TicketMaster api key
const TM_API_KEY = process.env.TM_API_KEY ?? "undefined";
if (TM_API_KEY === "undefined") throw new Error("Missing environment variable: TM_API_KEY");

// TM_SUBGENRE_ID : TicketMaster subgenre ID (Individual, Comedian)
const TM_SUBGENRE_ID = process.env.TM_SUBGENRE_ID ?? "undefined";
if (TM_SUBGENRE_ID === "undefined") throw new Error("Missing environment variable: TM_SUBGENRE_ID");

// TM_ATTRACTIONS_URL : TicketMaster api url
const TM_ATTRACTIONS_URL = process.env.TM_ATTRACTIONS_URL ?? "undefined";
if (TM_ATTRACTIONS_URL === "undefined") throw new Error("Missing environment variable: TM_ATTRACTIONS_URL");

// TM_EVENTS_URL : TicketMaster api url
const TM_EVENTS_URL = process.env.TM_EVENTS_URL ?? "undefined";
if (TM_EVENTS_URL === "undefined") throw new Error("Missing environment variable: TM_EVENTS_URL");

// TM_ACT_LIMIT
const TM_ACT_LIMIT = process.env.TM_ACT_LIMIT ?? -1;
if (TM_ACT_LIMIT == -1) throw new Error("Missing environment variable: TM_ACT_LIMIT");

// TM_RATE_LIMIT
const TM_RATE_LIMIT = process.env.TM_RATE_LIMIT ?? -1;
if (TM_RATE_LIMIT == -1) throw new Error("Missing environment variable: TM_RATE_LIMIT");

const Env = {
    DEBUG,
    LOG_LEVEL,
    LOG_DIR,
    HOST,
    PORT,
    DB_STRING,
    API_NEARBY_LIMIT: parseInt(API_NEARBY_LIMIT),
    ENGINE_RETRY_LIMIT: parseInt(ENGINE_RETRY_LIMIT),
    TM_API_KEY,
    TM_SUBGENRE_ID,
    TM_ATTRACTIONS_URL,
    TM_EVENTS_URL,
    TM_ACT_LIMIT: parseInt(TM_ACT_LIMIT),
    TM_RATE_LIMIT: parseInt(TM_RATE_LIMIT)
};

export default Env;
