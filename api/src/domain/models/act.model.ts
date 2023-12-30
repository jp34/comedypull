import mongoose from "mongoose";
import { Image, ImageSchema } from "./image.model";

// -- Act Model - Defines a single comedian

export interface Act {
    id: string;
    url: string;
    name: string;
    relevance: number;
    images: Image[];
    locale: string;
    version: string;
    createdAt: Date;
    updatedAt: Date;
}

const ActSchema = new mongoose.Schema<Act>({
    id: { type: String, required: true, unique: true },
    url: { type: String, required: true },
    name: { type: String, required: true },
    relevance: { type: Number, required: true },
    images: {
        type: [ImageSchema]
    },
    locale: { type: String, required: true },
    version: { type: String, required: true },
    createdAt: { type: Date },
    updatedAt: { type: Date }
}, { timestamps: true });

export const ActModel = mongoose.model<Act>("Act", ActSchema);
