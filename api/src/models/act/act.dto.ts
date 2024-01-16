import { ImageResponse } from "../image";
import { ShowResponse } from "../show";

export type ActResponse = {
    _id: string;
    id: string;
    url: string;
    name: string;
    locale: string;
    images: Array<ImageResponse>;
}

export const ActResponseFieldProjection = [
    "_id",
    "id",
    "url",
    "name",
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

export const ActDetailResponseFieldProjection = [
    "_id",
    "id",
    "url",
    "name",
    "relevance",
    "locale",
    "images"
];
