
export type ActFilter = {
    id?: string;
    url?: string;
    name?: string;
    relevance?: number;
    locale?: string;
    version?: string;
}

export type ActQuery = {
    filter?: ActFilter;
    size?: number;
    page?: number;
}

export const parseActFilter = (queryObj: any): ActFilter => {
    let filter: ActFilter = {};
    if (queryObj.id) filter.id = queryObj.id;
    if (queryObj.name) filter.name = queryObj.name;
    if (queryObj.relevance) filter.relevance = queryObj.relevance;
    if (queryObj.locale) filter.locale = queryObj.locale;
    if (queryObj.version) filter.version = queryObj.version;
    return filter;
}

export const parseActQuery = (queryObj: any): ActQuery => {
    let query: ActQuery = {
        filter: parseActFilter(queryObj),
        size: queryObj.size,
        page: queryObj.page
    };
    return query;
}
