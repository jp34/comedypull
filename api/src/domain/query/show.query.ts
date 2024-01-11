
export type ShowFilter = {
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

export type ShowQuery = {
    filter?: ShowFilter;
    size?: number;
    page?: number;
    location?: {
        latitude: number;
        longitude: number;
    }
}

export const parseShowFilter = (queryObj: any): ShowFilter => {
    let filter: ShowFilter = {};
    if (queryObj.id) filter.id = queryObj.id;
    if (queryObj.name) filter.name = queryObj.name;
    if (queryObj.timezone) filter.timezone = queryObj.timezone;
    if (queryObj.locale) filter.locale = queryObj.locale;
    if (queryObj.version) filter.version = queryObj.version;
    return filter;
}

export const parseShowQuery = (queryObj: any): ShowQuery => {
    let query: ShowQuery = {
        filter: parseShowFilter(queryObj),
        size: queryObj.size,
        page: queryObj.page
    };
    if (queryObj.latitude && queryObj.longitude) query.location = {
        latitude: parseFloat(queryObj.latitude),
        longitude: parseFloat(queryObj.longitude)
    };
    return query;
}
