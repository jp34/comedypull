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
exports.deleteComedian = exports.updateComedianFacebook = exports.updateComedianTwitter = exports.updateComedianInstagram = exports.updateComedianWebsite = exports.updateComedianBio = exports.updateComedianName = exports.findComediansBySearch = exports.findComedianById = exports.createComedian = void 0;
const entity_1 = require("./entity");
const logger_1 = __importDefault(require("../../../config/logger"));
const createComedian = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const comedian = yield entity_1.ComedianModel.create({
        name: payload.name,
        bio: payload.bio,
        website: payload.website,
        socialInstagram: payload.socialInstagram,
        socialTwitter: payload.socialTwitter,
        socialFacebook: payload.socialFacebook
    });
    logger_1.default.info({
        action: "createComedian",
        resource: `comedian:${comedian._id}`
    });
    return comedian;
});
exports.createComedian = createComedian;
const findComedianById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const comedian = yield entity_1.ComedianModel.findById(id).lean();
    if (!comedian)
        throw new Error("NonExistentResource!");
    logger_1.default.info({
        action: "findComedianById",
        resource: `comedian:${comedian._id}`
    });
    return comedian;
});
exports.findComedianById = findComedianById;
const findComediansBySearch = (params) => __awaiter(void 0, void 0, void 0, function* () {
    const comedians = yield entity_1.ComedianModel.find(params).lean();
    logger_1.default.info({
        action: "findComediansBySearch"
    });
    return comedians;
});
exports.findComediansBySearch = findComediansBySearch;
const updateComedianName = (id, name) => __awaiter(void 0, void 0, void 0, function* () {
    const comedian = yield entity_1.ComedianModel.findById(id).select('_id name');
    if (!comedian)
        throw new Error("NonExistentResource!");
    comedian.name = name;
    yield comedian.save();
    logger_1.default.info({
        action: "updateComedianName",
        resource: `comedian:${comedian._id}`
    });
    return true;
});
exports.updateComedianName = updateComedianName;
const updateComedianBio = (id, bio) => __awaiter(void 0, void 0, void 0, function* () {
    const comedian = yield entity_1.ComedianModel.findById(id).select('_id bio');
    if (!comedian)
        throw new Error("NonExistentResource!");
    comedian.bio = bio;
    yield comedian.save();
    logger_1.default.info({
        action: "updateComedianBio",
        resource: `comedian:${comedian._id}`
    });
    return true;
});
exports.updateComedianBio = updateComedianBio;
const updateComedianWebsite = (id, website) => __awaiter(void 0, void 0, void 0, function* () {
    const comedian = yield entity_1.ComedianModel.findById(id).select('_id website');
    if (!comedian)
        throw new Error("NonExistentResource!");
    comedian.website = website;
    yield comedian.save();
    logger_1.default.info({
        action: "updateComedianWebsite",
        resource: `comedian:${comedian._id}`
    });
    return true;
});
exports.updateComedianWebsite = updateComedianWebsite;
const updateComedianInstagram = (id, socialInstagram) => __awaiter(void 0, void 0, void 0, function* () {
    const comedian = yield entity_1.ComedianModel.findById(id).select('_id socialInstagram');
    if (!comedian)
        throw new Error("NonExistentResource!");
    comedian.socialInstagram = socialInstagram;
    yield comedian.save();
    logger_1.default.info({
        action: "updateComedianInstagram",
        resource: `comedian:${comedian._id}`
    });
    return true;
});
exports.updateComedianInstagram = updateComedianInstagram;
const updateComedianTwitter = (id, socialTwitter) => __awaiter(void 0, void 0, void 0, function* () {
    const comedian = yield entity_1.ComedianModel.findById(id).select('_id socialTwitter');
    if (!comedian)
        throw new Error("NonExistentResource!");
    comedian.socialTwitter = socialTwitter;
    yield comedian.save();
    logger_1.default.info({
        action: "updateComedianTwitter",
        resource: `comedian:${comedian._id}`
    });
    return true;
});
exports.updateComedianTwitter = updateComedianTwitter;
const updateComedianFacebook = (id, socialFacebook) => __awaiter(void 0, void 0, void 0, function* () {
    const comedian = yield entity_1.ComedianModel.findById(id).select('_id socialFacebook');
    if (!comedian)
        throw new Error("NonExistentResource!");
    comedian.socialFacebook = socialFacebook;
    yield comedian.save();
    logger_1.default.info({
        action: "updateComedianFacebook",
        resource: `comedian:${comedian._id}`
    });
    return true;
});
exports.updateComedianFacebook = updateComedianFacebook;
const deleteComedian = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const comedian = yield entity_1.ComedianModel.findById(id).select('_id');
    if (!comedian)
        throw new Error("NonExistentResource!");
    comedian.deleteOne();
    logger_1.default.info({
        action: "deleteComedian",
        resource: `comedian:${comedian._id}`
    });
    return true;
});
exports.deleteComedian = deleteComedian;
