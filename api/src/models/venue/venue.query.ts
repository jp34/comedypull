
export type VenueFilter = {
    id?: string;
    url?: string;
    name?: string;
    locale?: string;
    version?: string;
}

export type VenueQuery = {
    filter?: VenueFilter;
    size?: number;
    page?: number;
    location?: {
        latitude: number;
        longitude: number;
    }
}

export const parseVenueFilter = (queryObj: any): VenueFilter => {
    let filter: VenueFilter = {};
    if (queryObj.id) filter.id = queryObj.id;
    if (queryObj.name) filter.name = queryObj.name;
    if (queryObj.locale) filter.locale = queryObj.locale;
    if (queryObj.version) filter.version = queryObj.version;
    return filter;
}

export const parseVenueQuery = (queryObj: any): VenueQuery => {
    let query: VenueQuery = {
        filter: parseVenueFilter(queryObj),
        size: queryObj.size,
        page: queryObj.page
    };
    if (queryObj.latitude && queryObj.longitude) query.location = {
        latitude: parseFloat(queryObj.latitude),
        longitude: parseFloat(queryObj.longitude)
    };
    return query;
}
