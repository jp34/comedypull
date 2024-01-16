import mongoose from "mongoose";

// -- Location Model - Defines a single geospatial point

export interface Location {
    type: String;
    coordinates: number[];
}

export const LocationSchema = new mongoose.Schema<Location>({
    type: {
        type: String,
        enum: ["Point"],
        required: true
    },
    coordinates: {
        type: [Number],
        required: true
    }
}, { _id: false });

// -- Address Model - Defines a single street address

export interface Address {
    address: string;
    city: string;
    postCode: string;
    state: {
        name: string;
        code: string;
    }
    country: {
        name: string;
        code: string;
    }
}

export const AddressSchema = new mongoose.Schema<Address>({
    address: { type: String, required: true },
    city: { type: String, required: true },
    postCode: { type: String, required: true },
    state: {
        name: { type: String, sparse: true },
        code: { type: String, sparse: true }
    },
    country: {
        name: { type: String, sparse: true },
        code: { type: String, sparse: true }
    }
}, { _id: false });
