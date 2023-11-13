import mongoose, { Schema } from "mongoose"

export interface Act {
    ticketmasterId: string
    name: string
    bio: string
    website: string
    socialInstagram: string
    socialTwitter: string
    socialFacebook: string
    dateCreated: Date
    dateModified: Date
}

const ActSchema = new Schema<Act>({
    ticketmasterId: { type: String, required: true },
    name: { type: String, required: true },
    bio: { type: String, default: null },
    website: { type: String, default: null },
    socialInstagram: { type: String, default: null },
    socialTwitter: { type: String, default: null },
    socialFacebook: { type: String, default: null },
    dateCreated: { type: Date, default: Date.now() },
    dateModified: { type: Date, default: Date.now() }
});

export const ActModel = mongoose.model<Act>("Act", ActSchema);
