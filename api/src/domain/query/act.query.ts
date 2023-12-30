
export interface ActFilter {
    id?: string;
    url?: string;
    name?: string;
    relevance?: number;
    locale?: string;
    version?: string;
}

export interface ActQuery {
    filter?: ActFilter;
    paginate?: {
        size?: number;
        page?: number;
    }
    populate?: {
        shows?: boolean;
    }
}

export const parseActFilter = (queryObj: any): ActFilter => {
    let filter: ActFilter = {};
    if (queryObj.id) filter.id = queryObj.id;
    if (queryObj.url) filter.url = queryObj.url;
    if (queryObj.name) filter.name = queryObj.name;
    if (queryObj.relevance) filter.relevance = queryObj.relevance;
    if (queryObj.locale) filter.locale = queryObj.locale;
    if (queryObj.version) filter.version = queryObj.version;
    return filter;
}

export const parseActQuery = (queryObj: any): ActQuery => {
    let query: ActQuery = {
        filter: parseActFilter(queryObj),
        paginate: {
            size: queryObj.size,
            page: queryObj.page
        },
        populate: {
            shows: (queryObj.shows === "true") ? true : false
        }
    };
    return query;
}
