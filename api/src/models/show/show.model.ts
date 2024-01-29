import mongoose, { Schema } from "mongoose";
import { ImageSchema } from "../image";
import { LocationSchema } from "../geo";

const ShowSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    url: { type: String, required: true },
    actId: {
        type: Schema.Types.ObjectId,
        ref: "Act",
        required: true
    },
    venueId: {
        type: Schema.Types.ObjectId,
        ref: "Venue",
        required: true
    },
    name: { type: String, required: true },
    date: { type: Date, required: true },
    timezone: { type: String, required: true },
    location: {
        type: LocationSchema,
        required: true
    },
    images: {
        type: [ImageSchema]
    },
    locale: { type: String, required: true },
    version: { type: String, required: true },
    batch: { type: String, required: true },
    createdAt: { type: Date },
    updatedAt: { type: Date }
}, { timestamps: true });

ShowSchema.index({ location: "2dsphere" });

export const ShowModel = mongoose.model("Show", ShowSchema);
