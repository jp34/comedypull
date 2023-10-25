import mongoose, { Schema } from "mongoose"

export interface CreateComedianPayload {
    name: string
    bio?: string
    website?: string
    socialInstagram?: string
    socialTwitter?: string
    socialFacebook?: string
}

export interface ComedianSearchParams {
    name?: string
    socialInstagram?: string
    socialTwitter?: string
    socialFacebook?: string
}

export interface Comedian {
    name: string
    bio: string
    website: string
    socialInstagram: string
    socialTwitter: string
    socialFacebook: string
}

const ComedianSchema = new Schema<Comedian>({
    name: { type: String, required: true },
    bio: { type: String, default: null },
    website: { type: String, default: null },
    socialInstagram: { type: String, default: null },
    socialTwitter: { type: String, default: null },
    socialFacebook: { type: String, default: null },
});

export const ComedianModel = mongoose.model<Comedian>("Comedian", ComedianSchema);
