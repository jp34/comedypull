"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const logger_1 = __importDefault(require("./logger"));
const error_1 = require("../entity/error");
// DEBUG : Run in debug mode
const DEBUG = (_a = process.env.DEBUG) !== null && _a !== void 0 ? _a : "undefined";
if (DEBUG === "undefined")
    throw new error_1.ConfigurationError("Missing environment variable: DEBUG");
logger_1.default.debug(`DEBUG: ${DEBUG}`);
// BACKEND_HOST : Host the server is running on
const HOST = (_b = process.env.BACKEND_HOST) !== null && _b !== void 0 ? _b : "undefined";
if (HOST === "undefined")
    throw new error_1.ConfigurationError("Missing environment variable: BACKEND_HOST");
logger_1.default.debug(`HOST: ${HOST}`);
// BACKEND_PORT : Port to start server on
const PORT = (_c = process.env.BACKEND_PORT) !== null && _c !== void 0 ? _c : "undefined";
if (PORT === "undefined")
    throw new error_1.ConfigurationError("Missing environment variable: BACKEND_PORT");
logger_1.default.debug(`PORT: ${PORT}`);
// BACKEND_DB_STRING : MongoDB connection string
const DB_STRING = (_d = process.env.BACKEND_DB_STRING) !== null && _d !== void 0 ? _d : "undefined";
if (DB_STRING === "undefined")
    throw new error_1.ConfigurationError("Missing environment variable: BACKEND_DB_STRING");
logger_1.default.debug(`DB_STRING: ${DB_STRING}`);
const Env = {
    DEBUG,
    HOST,
    PORT,
    DB_STRING,
};
exports.default = Env;
