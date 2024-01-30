import {
    NearbyQuery,
    ActFilter,
    ActQuery,
    ShowFilter,
    ShowQuery,
    VenueFilter,
    VenueQuery
} from "./query.model";

export const mapToNearbyQuery = (queryObj: any): NearbyQuery => {
    let query: NearbyQuery = {
        geo: {
            latitude: parseFloat(queryObj.latitude),
            longitude: parseFloat(queryObj.longitude)
        }
    };
    if (queryObj.size) query.size = parseInt(queryObj.size);
    if (queryObj.page) query.page = parseInt(queryObj.page);
    return query;
}

// -- Act query mappers

export const mapToActFilter = (queryObj: any): ActFilter => {
    let filter: ActFilter = {};
    if (queryObj.id) filter.id = queryObj.id;
    if (queryObj.name) filter.name = queryObj.name;
    if (queryObj.relevance) filter.relevance = queryObj.relevance;
    if (queryObj.locale) filter.locale = queryObj.locale;
    if (queryObj.version) filter.version = queryObj.version;
    return filter;
}

export const mapToActQuery = (queryObj: any): ActQuery => {
    let query: ActQuery = { filter: mapToActFilter(queryObj)};
    if (queryObj.size) query.size = parseInt(queryObj.size);
    if (queryObj.page) query.page = parseInt(queryObj.page);
    return query;
}

// -- Show query mappers

export const mapToShowFilter = (queryObj: any): ShowFilter => {
    let filter: ShowFilter = {};
    if (queryObj.id) filter.id = queryObj.id;
    if (queryObj.name) filter.name = queryObj.name;
    if (queryObj.timezone) filter.timezone = queryObj.timezone;
    if (queryObj.locale) filter.locale = queryObj.locale;
    if (queryObj.version) filter.version = queryObj.version;
    return filter;
}

export const mapToShowQuery = (queryObj: any): ShowQuery => {
    let query: ShowQuery = { filter: mapToShowFilter(queryObj)};
    if (queryObj.size) query.size = parseInt(queryObj.size);
    if (queryObj.page) query.page = parseInt(queryObj.page);
    return query;
}

// -- Venue query mappers

export const mapToVenueFilter = (queryObj: any): VenueFilter => {
    let filter: VenueFilter = {};
    if (queryObj.id) filter.id = queryObj.id;
    if (queryObj.name) filter.name = queryObj.name;
    if (queryObj.locale) filter.locale = queryObj.locale;
    if (queryObj.version) filter.version = queryObj.version;
    return filter;
}

export const mapToVenueQuery = (queryObj: any): VenueQuery => {
    let query: VenueQuery = { filter: mapToVenueFilter(queryObj)};
    if (queryObj.size) query.size = parseInt(queryObj.size);
    if (queryObj.page) query.page = parseInt(queryObj.page);
    return query;
}
