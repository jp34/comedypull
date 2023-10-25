import mongoose, { Schema } from "mongoose";

export interface CreateShowPayload {
    comedianId: string
    date: Date
    venueName: string
    venueAddress: string
}

export interface ShowSearchParams {
    comedianId?: string
    dateFrom?: Date
    dateUntil?: Date
    venueName?: string
}

export interface Show {
    comedianId: string
    date: Date
    venueName: string
    venueAddress: string
}

const ShowSchema = new Schema<Show>({
    comedianId: { type: String, required: true },
    date: { type: Date, required: true },
    venueName: { type: String, required: true },
    venueAddress: { type: String, required: true }
});

export const ShowModel = mongoose.model<Show>("Show", ShowSchema);
