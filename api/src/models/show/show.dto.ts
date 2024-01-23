import { ActResponse, ActResponseFieldProjection } from "../act";
import { VenueResponse, VenueResponseFieldProjection } from "../venue";
import { LocationResponse } from "../geo";
import { ImageResponse } from "../image";

export type ShowResponse = {
    _id: string;
    id: string;
    url: string;
    name: string;
    date: string;
    timezone: string;
    locale: string;
    location: LocationResponse;
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

export type ShowDetailResponse = {
    _id: string;
    id: string;
    url: string;
    name: string;
    date: string;
    timezone: string;
    locale: string;
    location: LocationResponse;
    act: ActResponse;
    venue: VenueResponse;
    images: Array<ImageResponse>;
}

export const EmbeddedShowResponseFieldProjection = {
    _id: 1,
    id: 1,
    url: 1,
    name: 1,
    date: 1,
    timezone: 1,
    locale: 1,
    location: 1,
};

export const ShowResponseFieldProjection = {
    _id: 1,
    id: 1,
    url: 1,
    name: 1,
    date: 1,
    timezone: 1,
    locale: 1,
    location: 1,
    act: { id: 1, name: 1 },
    venue: { id: 1, name: 1 }
};

export const ShowDetailResponseFieldProjection = {
    _id: 1,
    id: 1,
    url: 1,
    name: 1,
    date: 1,
    timezone: 1,
    locale: 1,
    location: 1,
    act: {
        _id: 1,
        id: 1,
        url: 1,
        name: 1,
        locale: 1,
    },
    venue: {
        _id: 1,
        id: 1,
        url: 1,
        name: 1,
        location: 1,
        locale: 1
    }
};
