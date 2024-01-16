import { AddressResponse, LocationResponse } from "../geo";
import { ImageResponse } from "../image";
import { ShowResponse } from "../show";

export type VenueResponse = {
    _id: string;
    id: string;
    url: string;
    name: string;
    address: AddressResponse;
    locale: string;
    images: Array<ImageResponse>;
}

export const VenueResponseFieldProjection = [
    "_id",
    "id",
    "url",
    "name",
    "address",
    "locale",
    "images"
];

export type VenueDetailResponse = {
    _id: string;
    id: string;
    url: string;
    name: string;
    locale: string;
    location: LocationResponse;
    address: AddressResponse;
    shows: Array<ShowResponse>;
    images: Array<ImageResponse>;
}

export const VenueDetailResponseFieldProjection = [
    "_id",
    "id",
    "url",
    "name",
    "location",
    "address",
    "locale",
    "images"
];
