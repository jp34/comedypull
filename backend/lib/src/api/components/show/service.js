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
exports.deleteShow = exports.updateShowVenueAddress = exports.updateShowVenueName = exports.updateShowDate = exports.findShowBySearch = exports.findShowById = exports.createShow = void 0;
const entity_1 = require("./entity");
const logger_1 = __importDefault(require("../../../config/logger"));
const createShow = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const show = yield entity_1.ShowModel.create({
        comedianId: payload.comedianId,
        date: payload.date,
        venueName: payload.venueName,
        venueAddress: payload.venueAddress
    });
    logger_1.default.info({
        action: "createShow",
        resource: `show:${show._id}`
    });
    return show;
});
exports.createShow = createShow;
const findShowById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const show = yield entity_1.ShowModel.findById(id).lean().select('-__v');
    if (!show)
        throw new Error("NonExistentResource!");
    logger_1.default.info({
        action: "findShowById",
        resource: `show:${show._id}`
    });
    return show;
});
exports.findShowById = findShowById;
const findShowBySearch = (params, limit = 10, offset = 0) => __awaiter(void 0, void 0, void 0, function* () {
    const shows = yield entity_1.ShowModel.find({
        comedianId: params.comedianId,
        venueName: params.venueName,
        date: {
            $gte: params.dateFrom,
            $lte: params.dateUntil
        }
    }).limit(limit).skip(offset).lean().select('-__v');
    logger_1.default.info({
        action: "findShowBySearch",
    });
    return shows;
});
exports.findShowBySearch = findShowBySearch;
const updateShowDate = (id, newDate) => __awaiter(void 0, void 0, void 0, function* () {
    const show = yield entity_1.ShowModel.findById(id).select('_id date');
    if (!show)
        throw new Error("NonExistentResource!");
    show.date = new Date(newDate);
    yield show.save();
    logger_1.default.info({
        action: "updateShowDate",
        resource: `show:${show._id}`
    });
    return true;
});
exports.updateShowDate = updateShowDate;
const updateShowVenueName = (id, newName) => __awaiter(void 0, void 0, void 0, function* () {
    const show = yield entity_1.ShowModel.findById(id).select('_id venueName');
    if (!show)
        throw new Error("NonExistentResource!");
    show.venueName = newName;
    yield show.save();
    logger_1.default.info({
        action: "updateShowVenueName",
        resource: `show:${show._id}`
    });
    return true;
});
exports.updateShowVenueName = updateShowVenueName;
const updateShowVenueAddress = (id, newAddress) => __awaiter(void 0, void 0, void 0, function* () {
    const show = yield entity_1.ShowModel.findById(id).select('_id venueAddress');
    if (!show)
        throw new Error("NonExistentResource!");
    show.venueAddress = newAddress;
    yield show.save();
    logger_1.default.info({
        action: "updateShowVenueAddress",
        resource: `show:${show._id}`
    });
    return true;
});
exports.updateShowVenueAddress = updateShowVenueAddress;
const deleteShow = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const show = yield entity_1.ShowModel.findById(id).select("_id");
    if (!show)
        throw new Error("NonExistentResource!");
    yield show.deleteOne();
    logger_1.default.info({
        action: "deleteShow",
        resource: `show:${show._id}`
    });
    return true;
});
exports.deleteShow = deleteShow;
