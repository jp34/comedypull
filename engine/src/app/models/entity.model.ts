import mongoose, { Schema } from "mongoose";

// -- Define embedded document models

export interface Image {
    ratio: string;
    url: string;
    width: number;
    height: number;
}

export interface Venue {
    tm_id: string;
    tm_url: string;
    name: string;
    locale: string;
    address: string;
    city: string;
    state: string;
    post_code: string;
    country: string;
    country_code: string;
}

// -- Define core models

export interface Act {
    tm_id: string;
    tm_url: string;
    tm_images: Image[];
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

export interface Show {
    tm_id: string;
    tm_url: string;
    tm_act_id: string;
    name: string;
    venue: Venue;
    timezone: string;
    date_start: Date;
    date_created: Date;
    date_updated: Date;
}

// -- Define mongoose schemas

const ActSchema = new Schema<Act>({
    tm_id: { type: String, unique: true, required: true },
    tm_url: { type: String, unique: true, required: true },
    tm_images: {
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

const ShowSchema = new Schema<Show>({
    tm_id: { type: String, unique: true, required: true },
    tm_url: { type: String, unique: true, required: true },
    tm_act_id: { type: String, required: true },
    name: { type: String, required: true },
    venue: { type: {
        tm_id: { type: String },
        tm_url: { type: String },
        name: { type: String },
        locale: { type: String },
        address: { type: String },
        city: { type: String },
        state: { type: String },
        post_code: { type: String },
        country: { type: String },
        country_code: { type: String }
    }},
    timezone: { type: String, required: true },
    date_start: { type: Date, required: true },
    date_created: { type: Date, default: Date.now() },
    date_updated: { type: Date, default: Date.now() }
});

// -- Link models to mongoose and export

export const ActModel = mongoose.model<Act>("Act", ActSchema);
export const ShowModel = mongoose.model<Show>("Show", ShowSchema);
