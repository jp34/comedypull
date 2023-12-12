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
    post_code: string;
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
    tm_id: string;
    tm_url: string;
    name: string;
    geo: Geo;
    address: Address;
    locale: string;
    date_created: Date;
    date_updated: Date;
}

const VenueSchema = new Schema<Venue>({
    tm_id: { type: String, unique: true, required: true },
    tm_url: { type: String, unique: true, required: true },
    name: { type: String, required: true },
    geo: {
        latitude: { type: String, required: true },
        longitude: { type: String, required: true }
    },
    address: {
        address: { type: String, required: true },
        city: { type: String, required: true },
        post_code: { type: String, required: true },
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
    date_created: { type: Date, default: Date.now() },
    date_updated: { type: Date, default: Date.now() }
});

export const VenueModel = mongoose.model<Venue>("Venue", VenueSchema);


// -- Show Model - Defines a single comedy event

export interface Show {
    tm_id: string;
    tm_url: string;
    act_id: string;
    venue_id: string;
    name: string;
    timezone: string;
    locale: string;
    date_start: Date;
    date_created: Date;
    date_updated: Date;
}

const ShowSchema = new Schema<Show>({
    tm_id: { type: String, unique: true, required: true },
    tm_url: { type: String, unique: true, required: true },
    act_id: { type: String, required: true },
    venue_id: { type: String, required: true },
    name: { type: String, required: true },
    timezone: { type: String, required: true },
    locale: { type: String, required: true },
    date_start: { type: Date, required: true },
    date_created: { type: Date, default: Date.now() },
    date_updated: { type: Date, default: Date.now() }
});

export const ShowModel = mongoose.model<Show>("Show", ShowSchema);


// -- Act Model - Defines a single comedian

export interface Act {
    tm_id: string;
    tm_url: string;
    images: Image[];
    name: string;
    bio?: string;
    website?: string;
    social_instagram?: string;
    social_twitter?: string;
    social_facebook?: string;
    locale: string;
    date_created: Date;
    date_updated: Date;
}

const ActSchema = new Schema<Act>({
    tm_id: { type: String, unique: true, required: true },
    tm_url: { type: String, unique: true, required: true },
    images: {
        type: [{
            ratio: { type: String },
            url: { type: String },
            width: { type: Number },
            height: { type: Number }
        }],
    },
    name: { type: String, unique: true, required: true},
    bio: { type: String },
    website: { type: String, unique: true, sparse: true },
    social_instagram: { type: String, unique: true, sparse: true },
    social_twitter: { type: String, unique: true, sparse: true },
    social_facebook: { type: String, unique: true, sparse: true },
    locale: { type: String, required: true},
    date_created: { type: Date, default: Date.now() },
    date_updated: { type: Date, default: Date.now() }
});

export const ActModel = mongoose.model<Act>("Act", ActSchema);
