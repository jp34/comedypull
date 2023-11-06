"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const env_1 = __importDefault(require("./config/env"));
const logger_1 = __importDefault(require("./config/logger"));
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const url = "app.ticketmaster.com/discovery/v2/attractions";
    const searchParams = new URLSearchParams({
        apikey: env_1.default.API_KEY,
        locale: "*",
        size: "5",
        page: "0",
        sort: "relevance,desc",
        subGenreId: "KZazBEonSMnZfZ7vF17"
    });
    const full_url = `https://${url}?${searchParams.toString()}`;
    try {
        const response = yield axios_1.default.get(full_url);
        if (response.status != 200)
            throw new Error("Failed to request attractions");
        const attractions = response.data._embedded.attractions;
        attractions.forEach((a) => {
            console.log(a);
        });
    }
    catch (err) {
        logger_1.default.error("Failed to get available attractions");
    }
});
main();
