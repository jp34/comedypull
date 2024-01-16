import { ActResponse } from "../act";
import { LocationResponse } from "../geo";
import { ImageResponse } from "../image";
import { VenueResponse } from "../venue";

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
    venue: { id: 1, name: 1 },
    images: {
        $filter: {
            input: "$images",
            as: "i",
            cond: {
                $regexMatch: {
                    input: "$$i.url",
                    regex: "RETINA_PORTRAIT_3_2"
                }
            }
        }
    }
};

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

export const ShowDetailResponseFieldProjection = [
    "_id",
    "id",
    "url",
    "name",
    "date",
    "timezone",
    "locale",
    "location",
    "images"
];
