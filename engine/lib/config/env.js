"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const logger_1 = __importDefault(require("./logger"));
// DEBUG : Run in debug mode
const DEBUG = (_a = process.env.DEBUG) !== null && _a !== void 0 ? _a : "undefined";
if (DEBUG === "undefined")
    throw new Error("Missing environment variable: DEBUG");
logger_1.default.debug(`DEBUG: ${DEBUG}`);
// ENGINE_DB_STRING : MongoDB connection string
const DB_STRING = (_b = process.env.ENGINE_DB_STRING) !== null && _b !== void 0 ? _b : "undefined";
if (DB_STRING === "undefined")
    throw new Error("Missing environment variable: ENGINE_DB_STRING");
logger_1.default.debug(`DB_STRING: ${DB_STRING}`);
// ENGINE_API_KEY : TicketMaster api key
const API_KEY = (_c = process.env.ENGINE_API_KEY) !== null && _c !== void 0 ? _c : "undefined";
if (API_KEY === "undefined")
    throw new Error("Missing environment variable: ENGINE_API_KEY");
logger_1.default.debug(`API_KEY: ${API_KEY}`);
const Env = {
    DEBUG,
    API_KEY,
    DB_STRING,
};
exports.default = Env;
