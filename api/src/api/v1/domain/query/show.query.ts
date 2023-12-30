
export interface ShowFilter {
    id?: string;
    url?: string;
    actId?: string;
    venueId?: string;
    name?: string;
    dateStart?: Date;
    timezone?: string;
    locale?: string;
    version?: string;
}

export interface ShowQuery {
    filter?: ShowFilter;
    paginate?: {
        size?: number;
        page?: number;
    }
    location?: {
        latitude: number;
        longitude: number;
    }
    populate?: {
        acts?: boolean;
        venues?: boolean;
    }
}

export const parseShowFilter = (queryObj: any): ShowFilter => {
    let filter: ShowFilter = {};
    if (queryObj.id) filter.id = queryObj.id;
    if (queryObj.url) filter.url = queryObj.url;
    if (queryObj.actId) filter.actId = queryObj.actId;
    if (queryObj.venueId) filter.venueId = queryObj.venueId;
    if (queryObj.name) filter.name = queryObj.name;
    if (queryObj.dateStart) filter.dateStart = queryObj.dateStart;
    if (queryObj.timezone) filter.timezone = queryObj.timezone;
    if (queryObj.locale) filter.locale = queryObj.locale;
    if (queryObj.version) filter.version = queryObj.version;
    return filter;
}

export const parseShowQuery = (queryObj: any): ShowQuery => {
    let query: ShowQuery = {
        filter: parseShowFilter(queryObj),
        paginate: {
            size: queryObj.size,
            page: queryObj.page
        },
        populate: {
            acts: (queryObj.acts === "true") ? true : false,
            venues: (queryObj.venues === "true") ? true : false
        }
    };
    if (queryObj.latitude && queryObj.longitude) query.location = {
        latitude: parseFloat(queryObj.latitude),
        longitude: parseFloat(queryObj.longitude)
    };
    return query;
}
