
export interface Query {
    size?: number;
    page?: number;
}

export interface Filter {
    id?: string;
    version?: string;
}

export interface FilterQuery extends Query {
    filter: Filter;
}

export interface NearbyQuery extends Query {
    geo: {
        latitude: number;
        longitude: number;
    }
}

export interface ActFilter extends Filter {
    id?: string;
    url?: string;
    name?: string;
    relevance?: number;
    locale?: string;
    version?: string;
}

export interface ActQuery extends FilterQuery {}

export interface ShowFilter extends Filter {
    id?: string;
    url?: string;
    act?: string;
    venue?: string;
    name?: string;
    date?: Date;
    timezone?: string;
    locale?: string;
    version?: string;
}

export interface ShowQuery extends FilterQuery {}

export interface VenueFilter extends Filter {
    id?: string;
    url?: string;
    name?: string;
    locale?: string;
    version?: string;
}

export interface VenueQuery extends FilterQuery {}
