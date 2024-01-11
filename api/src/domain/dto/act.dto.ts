import { ImageResponse } from "./image.dto";
import { ShowResponse } from "./show.dto";

export const ActResponseFieldMask = [
    "_id",
    "id",
    "url",
    "name",
    "locale",
    "images"
];

export type ActResponse = {
    _id: string;
    id: string;
    url: string;
    name: string;
    locale: string;
    images: Array<ImageResponse>;
}

export const ActDetailResponseFieldMask = [
    "_id",
    "id",
    "url",
    "name",
    "relevance",
    "locale",
    "images"
];

export type ActDetailResponse = {
    _id: string;
    id: string;
    url: string;
    name: string;
    relevance: number;
    locale: string;
    shows: Array<ShowResponse>;
    images: Array<ImageResponse>;
}
