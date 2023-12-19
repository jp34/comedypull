import mongoose, { Schema } from "mongoose";

export interface Image {
    ratio: string;
    url: string;
    width: number;
    height: number;
}

export interface Address {
    address: string;
    city: string;
    postCode: string;
    state: {
        name: string;
        code: string;
    }
    country: {
        name: string;
        code: string;
    }
}

export interface Geo {
    latitude: number;
    longitude: number;
}


// -- Venue Model - Defines a single venue hosting a comedy event

export interface Venue {
    id: string;
    url: string;
    name?: string;
    geo: Geo;
    address: Address;
    locale: string;
    versionId: string;
}

const VenueSchema = new Schema<Venue>({
    id: { type: String, unique: true, required: true, immutable: true },
    url: { type: String, required: true, immutable: true },
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
            name: { type: String },
            code: { type: String }
        },
        country: {
            name: { type: String },
            code: { type: String }
        }
    },
    locale: { type: String, required: true },
    versionId: { type: String, required: true }
}, { timestamps: true });

export const VenueModel = mongoose.model<Venue>("Venue", VenueSchema);


// -- Show Model - Defines a single comedy event

export interface Show {
    id: string;
    url: string;
    actId: string;
    venueId: string;
    name?: string;
    timezone: string;
    locale: string;
    dateStart: Date;
    versionId: string;
}

const ShowSchema = new Schema<Show>({
    id: { type: String, unique: true, required: true, immutable: true },
    url: { type: String, required: true, immutable: true },
    actId: { type: String, required: true, immutable: true },
    venueId: { type: String, required: true },
    name: { type: String, sparse: true },
    timezone: { type: String, required: true },
    locale: { type: String, required: true },
    dateStart: { type: Date, required: true },
    versionId: { type: String, required: true }
}, { timestamps: true });

export const ShowModel = mongoose.model<Show>("Show", ShowSchema);


// -- Act Model - Defines a single comedian

export interface Act {
    id: string;
    url: string;
    name: string;
    bio?: string;
    website?: string;
    images: Image[];
    social: [
        {
            platform: string;
            handle: string;
        }
    ];
    locale: string;
    versionId: string;
}

const ActSchema = new Schema<Act>({
    id: { type: String, unique: true, required: true, immutable: true },
    url: { type: String, unique: true, required: true, immutable: true },
    name: { type: String, unique: true, required: true },
    bio: { type: String, sparse: true },
    website: { type: String, sparse: true },
    images: {
        type: [{
            ratio: { type: String },
            url: { type: String },
            width: { type: Number },
            height: { type: Number }
        }],
    },
    social: [
        {
            platform: { type: String },
            handle: { type: String }
        }
    ],
    locale: { type: String, required: true},
    versionId: { type: String, required: true }
}, { timestamps: true });

export const ActModel = mongoose.model<Act>("Act", ActSchema);
