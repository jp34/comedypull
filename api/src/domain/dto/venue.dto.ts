import { AddressResponse, LocationResponse } from "./geo.dto";
import { ImageResponse } from "./image.dto";
import { ShowResponse } from "./show.dto";

export const VenueResponseFieldMask = [
    "_id",
    "id",
    "url",
    "name",
    "address",
    "locale",
    "images"
];

export type VenueResponse = {
    _id: string;
    id: string;
    url: string;
    name: string;
    address: AddressResponse;
    locale: string;
    images: Array<ImageResponse>;
}

export const VenueDetailResponseFieldMask = [
    "_id",
    "id",
    "url",
    "name",
    "location",
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
