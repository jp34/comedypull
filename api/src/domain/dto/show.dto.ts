import { ActDetailResponse } from "./act.dto";
import { ImageResponse } from "./image.dto";
import { VenueDetailResponse } from "./venue.dto";

export const ShowResponseFieldMask = [
    "_id",
    "id",
    "url",
    "name",
    "date",
    "locale",
    "timezone",
    "images"
];

export type ShowResponse = {
    _id: string;
    id: string;
    url: string;
    name: string;
    date: string;
    locale: string;
    timezone: string;
    act: {
        id: string;
        name: string;
    }
    venue: {
        id: string;
        name: string;
    }
    images: Array<ImageResponse>;
}

export const ShowDetailResponseFieldMask = [
    "_id",
    "id",
    "url",
    "name",
    "date",
    "locale",
    "timezone",
    "images"
];

export type ShowDetailResponse = {
    _id: string;
    id: string;
    url: string;
    name: string;
    date: string;
    locale: string;
    timezone: string;
    act: ActDetailResponse;
    venue: VenueDetailResponse;
    images: Array<ImageResponse>;
}
