import { Schema } from "mongoose";

export interface TMImage {
    ratio: string;
    url: string;
    width: number;
    height: number;
}

export interface TMLocation {
    type: String;
    coordinates: number[];
}

export interface TMAddress {
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

export type TMVenue = {
    id: string;
    url: string;
    name: string;
    location: TMLocation;
    address: TMAddress;
    images: TMImage[];
    locale: string;
    version?: string;
    batch?: string;
}

export type TMShow = {
    id: string;
    url: string;
    actId: string | Schema.Types.ObjectId;
    venueId: string | Schema.Types.ObjectId;
    name: string;
    date: Date;
    timezone: string;
    location: TMLocation;
    images: TMImage[];
    locale: string;
    version?: string;
    batch?: string;
}

export type TMAct = {
    id: string;
    url: string;
    name: string;
    images: TMImage[];
    locale: string;
    relevance?: number;
    version?: string;
    batch?: string;
}
