import mongoose from "mongoose";
import { Image, ImageSchema } from "./image.model";

// -- Act Model - Defines a single comedian

export interface Act {
    id: string;
    url: string;
    name: string;
    images: Image[];
    locale: string;
    version: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface ActSearchParams {
    filter: {
        id?: string;
        url?: string;
        name?: string;
        locale?: string;
        version?: string;
    }
    populate: {
        shows?: boolean;
    }
    size?: number;
    page?: number;
}

const ActSchema = new mongoose.Schema<Act>({
    id: { type: String, required: true, unique: true },
    url: { type: String, required: true },
    name: { type: String, required: true },
    images: {
        type: [ImageSchema]
    },
    locale: { type: String, required: true },
    version: { type: String, required: true },
    createdAt: { type: Date },
    updatedAt: { type: Date }
}, { timestamps: true });

export const ActModel = mongoose.model<Act>("Act", ActSchema);