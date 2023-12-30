
export interface VenueFilter {
    id?: string;
    url?: string;
    name?: string;
    locale?: string;
    version?: string;
}

export interface VenueQuery {
    filter?: VenueFilter;
    paginate?: {
        size?: number;
        page?: number;
    }
    location?: {
        latitude: number;
        longitude: number;
    }
    populate?: {
        shows?: boolean;
    }
}

export const parseVenueFilter = (queryObj: any): VenueFilter => {
    let filter: VenueFilter = {};
    if (queryObj.id) filter.id = queryObj.id;
    if (queryObj.url) filter.url = queryObj.url;
    if (queryObj.name) filter.name = queryObj.name;
    if (queryObj.locale) filter.locale = queryObj.locale;
    if (queryObj.version) filter.version = queryObj.version;
    return filter;
}

export const parseVenueQuery = (queryObj: any): VenueQuery => {
    let query: VenueQuery = {
        filter: parseVenueFilter(queryObj),
        paginate: {
            size: queryObj.size,
            page: queryObj.page
        },
        populate: {
            shows: (queryObj.shows === "true") ? true : false
        }
    };
    if (queryObj.latitude && queryObj.longitude) query.location = {
        latitude: parseFloat(queryObj.latitude),
        longitude: parseFloat(queryObj.longitude)
    };
    return query;
}
