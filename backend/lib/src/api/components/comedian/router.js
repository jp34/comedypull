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
            throw new Error("InvalidInput!");
        const data = yield (0, service_1.createComedian)(payload);
        response.status(200).json({ data });
        next();
    }
    catch (err) {
        next(err);
    }
}));
router.get("/", (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const search = request.body.data;
        const data = yield (0, service_1.findComediansBySearch)(search);
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
        const data = yield (0, service_1.findComedianById)(id);
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
        if (request.query.name)
            yield (0, service_1.updateComedianName)(id, request.query.name.toString());
        if (request.query.bio)
            yield (0, service_1.updateComedianBio)(id, request.query.bio.toString());
        if (request.query.website)
            yield (0, service_1.updateComedianWebsite)(id, request.query.website.toString());
        if (request.query.socialInstagram)
            yield (0, service_1.updateComedianInstagram)(id, request.query.socialInstagram.toString());
        if (request.query.socialTwitter)
            yield (0, service_1.updateComedianTwitter)(id, request.query.socialTwitter.toString());
        if (request.query.socialFacebook)
            yield (0, service_1.updateComedianFacebook)(id, request.query.socialFacebook.toString());
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
        yield (0, service_1.deleteComedian)(id);
        response.status(200);
        next();
    }
    catch (err) {
        next(err);
    }
}));
exports.default = router;
