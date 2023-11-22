import mongoose, { Schema } from "mongoose"

export interface Image {
    ratio: string
    url: string
    width: number
    height: number
}

export interface TMAct {
    id: string
    name: string
    url: string
    locale: string
    images: Image[]
}

export interface Act {
    tm_id: string
    tm_url: string
    tm_images: Image[]
    name: string
    bio?: string
    website?: string
    social_instagram?: string
    social_twitter?: string
    social_facebook?: string
    locale: string
    date_created: Date
    date_updated: Date
}

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

export const ActModel = mongoose.model<Act>("Act", ActSchema);
