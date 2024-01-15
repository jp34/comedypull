import mongoose from "mongoose";
import { Image, ImageSchema } from "./image.model";
import { Location, LocationSchema, Address, AddressSchema } from "./geo.model";

// -- Venue Model - Defines a single venue hosting a comedy event

export interface Venue {
    id: string;
    url: string;
    name: string;
    location: Location;
    address: Address;
    images: Image[];
    locale: string;
    version: string;
    batch: string;
    createdAt: Date;
    updatedAt: Date;
}

const VenueSchema = new mongoose.Schema<Venue>({
    id: { type: String, required: true, unique: true },
    url: { type: String, required: true },
    name: { type: String, sparse: true },
    location: {
        type: LocationSchema,
        required: true
    },
    address: {
        type: AddressSchema,
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

VenueSchema.index({ location: "2dsphere" });

export const VenueModel = mongoose.model<Venue>("Venue", VenueSchema);