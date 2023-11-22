import Env from "../config/env";
import axios, { AxiosResponse } from "axios";
import { Image, TMAct } from "../models/act";
import logger from "../config/logger";

const ACT_SEARCH_PARAMS = new URLSearchParams({
    apikey: Env.API_KEY,
    locale: "en-us,en",
    sort: "relevance,desc",
    subGenreId: "KZazBEonSMnZfZ7vF17"
});

/**
 * This function takes an attraction object from a Ticketmaster response and returns
 * an object of type TMAct which contains the relevant information.
 * 
 * @param a Object with attraction data from Ticketmaster
 * @returns Object of type TMAct
 */
const extractTMActFromResponse = (a: any): TMAct => {
    // If the object contains images, extract them as well
    let images: Image[] = [];
    if (a.images != null) {
        images = a.images.map((i: any) => ({
            ratio: i.ratio,
            url: i.url,
            width: i.width,
            height: i.height
        }));
    }
    return {
        id: a.id,
        name: a.name,
        url: a.url,
        locale: a.locale,
        images
    };
}

/**
 * This function makes a GET request to the Ticketmaster API and fetches the top (N) acts
 * by relevance within the US (Where N is defined by the ACT_COUNT_CUTOFF environment variable).
 * 
 * @param size Response limit, or the number of acts to return
 * @param page Page offset number
 * @returns Array of acts with type TMAct
 */
export const fetchActs = async (size: number = Env.ACT_COUNT_CUTOFF, page: number = 0): Promise<TMAct[]> => {
    // Build a url for the /attractions endpoint of Ticketmasters API
    let url = `${Env.API_URL}?${ACT_SEARCH_PARAMS.toString()}&size=${size}&page=${page}`;
    let acts: TMAct[] = [];
    // Request the top acts from ticketmaster
    await axios.get(url).then((response: AxiosResponse) => {
        if (response.status != 200) throw new Error(`Request failed with code ${response.status}`);

        // Parse response into objects of type TMAct
        acts = response.data._embedded.attractions.map((a: any) => extractTMActFromResponse(a));
        logger.info('Received acts from Ticketmaster', {
            responseStatus: response.status,
            contentType: response.headers["Content-Type"],
            contentLength: response.headers["Content-Length"],
            count: acts.length,
            timestamp: new Date(Date.now()).toISOString()
        });
    }).catch((err: any) => {
        logger.error("Failed to request acts", {
            cause: err.message,
            url,
            timestamp: new Date(Date.now()).toISOString()
        });
    });
    return acts;
}
