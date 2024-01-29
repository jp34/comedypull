import { ImageResponse } from "../image";
import { EmbeddedShowResponseFieldProjection, ShowResponse } from "../show";

export type ActResponse = {
    _id: string;
    id: string;
    url: string;
    name: string;
    locale: string;
    images: Array<ImageResponse>;
}

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

export const ActResponseFieldProjection = {
    _id: 1,
    id: 1,
    url: 1,
    name: 1,
    locale: 1,
};

export const ActDetailResponseFieldProjection = {
    _id: 1,
    id: 1,
    url: 1,
    name: 1,
    relevance: 1,
    locale: 1,
    shows: EmbeddedShowResponseFieldProjection
};
