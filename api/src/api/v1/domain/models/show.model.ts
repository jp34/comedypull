import mongoose from "mongoose";
import { Image, ImageSchema } from "./image.model";
import { Location, LocationSchema } from "./geo.model";

// -- Show Model - Defines a single comedy event

export interface Show {
    id: string;
    url: string;
    actId: string;
    venueId: string;
    name: string;
    dateStart: Date;
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
    actId: { type: String, required: true },
    venueId: { type: String, required: true },
    name: { type: String, required: true },
    dateStart: { type: Date, required: true },
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