import { Act } from "./act.model";
import { Show } from "./show.model";
import { Venue } from "./venue.model";

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

export interface TMVenue {
    id: string;
    url: string;
    name: string;
    location: TMLocation;
    address: TMAddress;
    images: TMImage[];
    locale: string;
}

export interface TMShow {
    id: string;
    url: string;
    actId: string;
    venueId: string;
    name: string;
    dateStart: Date;
    timezone: string;
    location: TMLocation;
    images: TMImage[];
    locale: string;
}

export const mapToShow = (show: TMShow, version: string): Show => {
    return {
        ...show,
        version,
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now())
    }
}

export interface TMAct {
    id: string;
    url: string;
    name: string;
    images: TMImage[];
    locale: string;
}

export const mapToAct = (act: TMAct, relevance: number, version: string): Act => {
    return {
        ...act,
        relevance,
        version,
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now())
    };
}

export const mapToVenue = (venue: TMVenue, version: string): Venue => {
    return {
        ...venue,
        version,
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now())
    }
}
