import mongoose from "mongoose";
import { TMImage, TMAddress, TMLocation, TMVenue, TMShow, TMAct } from "./tm.model";


// -- Image Model - Defines data for a single image

export interface Image extends TMImage {}

const ImageSchema = new mongoose.Schema<Image>({
    ratio: { type: String },
    url: { type: String },
    width: { type: Number },
    height: { type: Number }
}, { _id: false });


// -- Location Model - Defines a single geospatial point

export interface Location extends TMLocation {}

const LocationSchema = new mongoose.Schema<Location>({
    type: {
        type: String,
        enum: ["Point"],
        required: true
    },
    coordinates: {
        type: [Number],
        required: true
    }
}, { _id: false });


// -- Address Model - Defines a single address

export interface Address extends TMAddress {}

const AddressSchema = new mongoose.Schema<Address>({
    address: { type: String, required: true },
    city: { type: String, required: true },
    postCode: { type: String, required: true },
    state: {
        name: { type: String, sparse: true },
        code: { type: String, sparse: true }
    },
    country: {
        name: { type: String, sparse: true },
        code: { type: String, sparse: true }
    }
}, { _id: false });



// -- Venue Model - Defines a single venue hosting a comedy event

export interface Venue extends TMVenue {
    version: string;
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
    createdAt: { type: Date },
    updatedAt: { type: Date }
}, { timestamps: true });

VenueSchema.index({ location: "2dsphere" });

export const VenueModel = mongoose.model<Venue>("Venue", VenueSchema);


// -- Show Model - Defines a single comedy event

export interface Show extends TMShow {
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


// -- Act Model - Defines a single comedian

export interface Act extends TMAct {
    version: string;
    createdAt: Date;
    updatedAt: Date;
}

const ActSchema = new mongoose.Schema<Act>({
    id: { type: String, required: true, unique: true },
    url: { type: String, required: true },
    name: { type: String, required: true },
    images: {
        type: [ImageSchema]
    },
    locale: { type: String, required: true },
    version: { type: String, required: true },
    createdAt: { type: Date },
    updatedAt: { type: Date }
}, { timestamps: true });

export const ActModel = mongoose.model<Act>("Act", ActSchema);
