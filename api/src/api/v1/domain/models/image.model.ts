import mongoose from "mongoose";

// -- Image Model - Defines data for a single image

export interface Image {
    ratio: string;
    url: string;
    width: number;
    height: number;
}

export const ImageSchema = new mongoose.Schema<Image>({
    ratio: { type: String },
    url: { type: String },
    width: { type: Number },
    height: { type: Number }
}, { _id: false });
