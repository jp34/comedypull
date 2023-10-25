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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const service_1 = require("./service");
const router = (0, express_1.Router)();
router.post("/", (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = request.body.data;
        if (!payload)
            throw new Error("InvalidInputError!");
        const data = yield (0, service_1.createShow)(payload);
        response.status(200).json({ data });
        next();
    }
    catch (err) {
        next(err);
    }
}));
router.get("/", (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, service_1.findShowBySearch)({});
        response.status(200).json({ data });
        next();
    }
    catch (err) {
        next(err);
    }
}));
router.get("/:id", (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = request.params.id;
        if (!id)
            throw new Error("InvalidInputError!");
        const data = yield (0, service_1.findShowById)(id);
        response.status(200).json({ data });
        next();
    }
    catch (err) {
        next(err);
    }
}));
router.put("/:id", (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = request.params.id;
        if (!id)
            throw new Error("InvalidInputError!");
        if (request.query.date)
            yield (0, service_1.updateShowDate)(id, request.query.date.toString());
        if (request.query.venueName)
            yield (0, service_1.updateShowVenueName)(id, request.query.venueName.toString());
        if (request.query.venueAddress)
            yield (0, service_1.updateShowVenueAddress)(id, request.query.venueAddress.toString());
        response.status(200);
        next();
    }
    catch (err) {
        next(err);
    }
}));
router.delete("/:id", (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = request.params.id;
        if (!id)
            throw new Error("InvalidInputError!");
        yield (0, service_1.deleteShow)(id);
        response.status(200);
        next();
    }
    catch (err) {
        next(err);
    }
}));
exports.default = router;
