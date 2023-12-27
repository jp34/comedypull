import mongoose, { Schema } from "mongoose";

export enum UpdateStatus {
    STARTED = "STARTED",
    DONE = "DONE",
    FAILED = "FAILED"
}

export interface Update {
    id: string;
    status: UpdateStatus;
    actCount: number;
    showCount: number;
    venueCount: number;
}

const UpdateSchema = new Schema<Update>({
    id: { type: String, unique: true, required: true, immutable: true },
    status: { type: String, default: UpdateStatus.STARTED },
    actCount: { type: Number, sparse: true },
    showCount: { type: Number, sparse: true },
    venueCount: { type: Number, sparse: true },
}, { timestamps: true });

export const UpdateModel = mongoose.model<Update>("Update", UpdateSchema);
