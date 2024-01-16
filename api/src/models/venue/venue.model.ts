import mongoose from "mongoose";
import { ImageSchema } from "../image";
import { LocationSchema, AddressSchema } from "../geo";

const VenueSchema = new mongoose.Schema({
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

export const VenueModel = mongoose.model("Venue", VenueSchema);
