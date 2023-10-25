"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connect = void 0;
const env_1 = __importDefault(require("./env"));
const mongoose_1 = __importDefault(require("mongoose"));
const logger_1 = __importDefault(require("./logger"));
const connect = () => {
    mongoose_1.default.set('strictQuery', false);
    mongoose_1.default.connect(env_1.default.DB_STRING).then(() => {
        logger_1.default.info('Successfully connected to database', {
            uri: env_1.default.DB_STRING,
            timestamp: Date.now()
        });
    }).catch((err) => {
        logger_1.default.warn(err.message);
        throw new Error('Failed to connect to database');
    });
};
exports.connect = connect;
