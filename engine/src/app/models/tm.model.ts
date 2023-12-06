
export interface TMImage {
    ratio: string;
    url: string;
    width: number;
    height: number;
}

export interface TMAddress {
    address: string;
    city: string;
    post_code: string;
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
    locale: string;
    address: TMAddress;
    geo: TMGeo;
}

export interface TMAttraction {
    id: string;
    url: string;
    name: string;
    images: TMImage[];
    locale: string;
}

export interface TMEvent {
    id: string;
    url: string;
    act_id: string;
    name: string;
    start_date: Date;
    timezone: string;
    locale: string;
    venue: TMVenue;
    images: TMImage[];
}
