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

export interface TM {
    id: string;
    url: string;
    locale: string;
    version?: string;
}

export interface TMVenue extends TM {
    id: string;
    url: string;
    name: string;
    location: TMLocation;
    address: TMAddress;
    images: TMImage[];
    locale: string;
    version?: string;
}

export interface TMShow extends TM {
    id: string;
    url: string;
    act: string | Schema.Types.ObjectId;
    venue: string | Schema.Types.ObjectId;
    name: string;
    dateStart: Date;
    timezone: string;
    location: TMLocation;
    images: TMImage[];
    locale: string;
    version?: string;
}

export interface TMAct extends TM {
    id: string;
    url: string;
    name: string;
    images: TMImage[];
    locale: string;
    relevance?: number;
    version?: string;
}
