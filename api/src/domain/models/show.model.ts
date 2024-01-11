import mongoose, { Schema } from "mongoose";
import { Image, ImageSchema } from "./image.model";
import { Location, LocationSchema } from "./geo.model";

// -- Show Model - Defines a single comedy event

export interface Show {
    id: string;
    url: string;
    act: Schema.Types.ObjectId;
    venue: Schema.Types.ObjectId;
    name: string;
    date: Date;
    timezone: string;
    location: Location;
    images: Image[];
    locale: string;
    version: string;
    createdAt: Date;
    updatedAt: Date;
}

const ShowSchema = new mongoose.Schema<Show>({
    id: { type: String, required: true, unique: true },
    url: { type: String, required: true },
    act: {
        type: Schema.Types.ObjectId,
        ref: "Act",
        required: true
    },
    venue: {
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
    createdAt: { type: Date },
    updatedAt: { type: Date }
}, { timestamps: true });

ShowSchema.index({ location: "2dsphere" });

export const ShowModel = mongoose.model<Show>("Show", ShowSchema);