import mongoose, { Schema } from "mongoose";
import { TMImage, TMAddress, TMGeo, TMVenue, TMShow, TMAct } from "./tm.model";

export interface Image extends TMImage {}

export interface Address extends TMAddress {}

export interface Geo extends TMGeo {}


// -- Venue Model - Defines a single venue hosting a comedy event

export interface Venue extends TMVenue {
    version: string;
    createdAt: Date;
    updatedAt: Date;
}

const VenueSchema = new Schema<Venue>({
    id: { type: String, required: true, unique: true },
    url: { type: String, required: true },
    name: { type: String, sparse: true },
    geo: {
        latitude: { type: String, required: true },
        longitude: { type: String, required: true }
    },
    address: {
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
    },
    images: {
        type: [{
            ratio: { type: String },
            url: { type: String },
            width: { type: Number },
            height: { type: Number }
        }]
    },
    locale: { type: String, required: true },
    version: { type: String, required: true },
    createdAt: { type: Date },
    updatedAt: { type: Date }
}, { timestamps: true });

export const VenueModel = mongoose.model<Venue>("Venue", VenueSchema);


// -- Show Model - Defines a single comedy event

export interface Show extends TMShow {
    version: string;
    createdAt: Date;
    updatedAt: Date;
}

const ShowSchema = new Schema<Show>({
    id: { type: String, required: true, unique: true },
    url: { type: String, required: true },
    actId: { type: String, required: true },
    venueId: { type: String, required: true },
    name: { type: String, required: true },
    dateStart: { type: Date, required: true },
    timezone: { type: String, required: true },
    geo: {
        latitude: { type: String, required: true },
        longitude: { type: String, required: true }
    },
    images: {
        type: [{
            ratio: { type: String },
            url: { type: String },
            width: { type: Number },
            height: { type: Number }
        }]
    },
    locale: { type: String, required: true },
    version: { type: String, required: true },
    createdAt: { type: Date },
    updatedAt: { type: Date }
}, { timestamps: true });

export const ShowModel = mongoose.model<Show>("Show", ShowSchema);


// -- Act Model - Defines a single comedian

export interface Act extends TMAct {
    version: string;
    createdAt: Date;
    updatedAt: Date;
}

const ActSchema = new Schema<Act>({
    id: { type: String, required: true, unique: true },
    url: { type: String, required: true },
    name: { type: String, required: true },
    images: {
        type: [{
            ratio: { type: String },
            url: { type: String },
            width: { type: Number },
            height: { type: Number }
        }],
    },
    locale: { type: String, required: true },
    version: { type: String, required: true },
    createdAt: { type: Date },
    updatedAt: { type: Date }
}, { timestamps: true });

export const ActModel = mongoose.model<Act>("Act", ActSchema);
