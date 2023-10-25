import mongoose, { Schema } from "mongoose"

export interface Comedian {
    name: string
    bio: string
    website: string
    socialInstagram: string
    socialTwitter: string
    socialFacebook: string
}

export interface Show {
    comedianId: string
    date: Date
    venueName: string
    venueAddress: string
}

const ComedianSchema = new Schema<Comedian>({
    name: { type: String, required: true },
    bio: { type: String, default: null },
    website: { type: String, default: null },
    socialInstagram: { type: String, default: null },
    socialTwitter: { type: String, default: null },
    socialFacebook: { type: String, default: null },
});

const ShowSchema = new Schema<Show>({
    comedianId: { type: String, required: true },
    date: { type: Date, required: true },
    venueName: { type: String, required: true },
    venueAddress: { type: String, required: true }
});

export const ComedianModel = mongoose.model<Comedian>("Comedian", ComedianSchema);
export const ShowModel = mongoose.model<Show>("Show", ShowSchema);
