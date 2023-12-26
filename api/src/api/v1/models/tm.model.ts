
export interface TMImage {
    ratio: string;
    url: string;
    width: number;
    height: number;
}

export interface TMAddress {
    address: string;
    city: string;
    postCode: string;
    state: {
        name: string;
        code: string;
    }
    country: {
        name: string;
        code: string;
    }
}

export interface TMGeo {
    latitude: number;
    longitude: number;
}

export interface TMVenue {
    id: string;
    url: string;
    name: string;
    geo: TMGeo;
    address: TMAddress;
    images: TMImage[];
    locale: string;
}

export interface TMShow {
    id: string;
    url: string;
    actId: string;
    venueId: string;
    name: string;
    dateStart: Date;
    timezone: string;
    geo: TMGeo;
    images: TMImage[];
    locale: string;
}

export interface TMAct {
    id: string;
    url: string;
    name: string;
    images: TMImage[];
    locale: string;
}
