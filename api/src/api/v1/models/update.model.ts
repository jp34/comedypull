import mongoose, { Schema } from "mongoose";

export interface Update {
    versionId: string;
}

const UpdateSchema = new Schema<Update>({
    versionId: { type: String, unique: true, required: true, immutable: true },
}, { timestamps: true });

export const UpdateModel = mongoose.model<Update>("Update", UpdateSchema);
