"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const env_1 = __importDefault(require("./config/env"));
const logger_1 = __importDefault(require("./config/logger"));
// Connect to MongoDB
const db_1 = require("./config/db");
(0, db_1.connect)();
// Load api after connecting
const api_1 = __importDefault(require("./api/api"));
api_1.default.listen(parseInt(env_1.default.PORT), env_1.default.HOST, () => {
    logger_1.default.info(`Server listening on port ${env_1.default.PORT}...`);
});
// Export started server so it can be imported by tests
exports.default = api_1.default;
