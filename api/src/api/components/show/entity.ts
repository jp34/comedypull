import mongoose, { Schema } from "mongoose";

export interface ShowSearchParams {
    actId?: string
    dateFrom?: Date
    dateUntil?: Date
    venueName?: string
}

export interface Show {
    actId: string
    date: Date
    venueName: string
    venueAddress: string
    dateCreated: Date
    dateModified: Date
}

const ShowSchema = new Schema<Show>({
    actId: { type: String, required: true },
    date: { type: Date, required: true },
    venueName: { type: String, required: true },
    venueAddress: { type: String, required: true },
    dateCreated: { type: Date, default: Date.now() },
    dateModified: { type: Date, default: Date.now() }
});

export const ShowModel = mongoose.model<Show>("Show", ShowSchema);
