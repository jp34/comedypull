import { Image, Geo, Address } from "./entity.model";

export interface TMImage extends Image {}
export interface TMAddress extends Address {}
export interface TMGeo extends Geo {}

export interface TMVenue {
    id: string;
    url: string;
    name: string;
    locale: string;
    address: TMAddress;
    geo: TMGeo;
    images: Image[];
}

export interface TMShow {
    id: string;
    url: string;
    actId: string;
    venueId: string;
    name: string;
    timezone: string;
    locale: string;
    dateStart: Date;
    images: TMImage[];
}

export interface TMAct {
    id: string;
    url: string;
    name: string;
    locale: string;
    images: TMImage[];
}
