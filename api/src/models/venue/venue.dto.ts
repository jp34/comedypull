import { AddressResponse, LocationResponse } from "../geo";
import { ImageResponse } from "../image";
import { EmbeddedShowResponseFieldProjection, ShowResponse } from "../show";

export type VenueResponse = {
    _id: string;
    id: string;
    url: string;
    name: string;
    location: LocationResponse;
    locale: string;
    images: Array<ImageResponse>;
}

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

export const VenueResponseFieldProjection = {
    _id: 1,
    id: 1,
    url: 1,
    name: 1,
    location: 1,
    locale: 1
};

export const VenueDetailResponseFieldProjection = {
    _id: 1,
    id: 1,
    url: 1,
    name: 1,
    location: 1,
    address: 1,
    locale: 1,
    shows: {
        _id: 1,
        id: 1,
        url: 1,
        name: 1,
        date: 1,
        timezone: 1,
        locale: 1,
        location: 1,
    },
};
