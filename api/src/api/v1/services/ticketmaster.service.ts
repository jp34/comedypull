import Env from "../../../config/env";
import { TMAttraction, Image } from "../models";
import logger from "../../../config/logger";
import axios, { AxiosResponse } from "axios";
import axiosRateLimit from "axios-rate-limit";

const client = axiosRateLimit(axios.create(), { maxRPS: 5 });
const ACT_SEARCH_PARAMS = new URLSearchParams({
    apikey: Env.TM_API_KEY,
    locale: "en-us,en",
    sort: "relevance,desc",
    subGenreId: "KZazBEonSMnZfZ7vF17"
});

/**
 * This function takes an attraction object from a Ticketmaster response and returns
 * an object of type TMAttraction which contains the relevant information.
 * 
 * @param a Object with attraction data from Ticketmaster
 * @returns Object of type TMAttraction
 */
const parseAttraction = (a: any): TMAttraction => {
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
 * This function makes a GET request to the Ticketmaster API and fetches the top (N) attractions
 * by relevance within the US (Where N is defined by the ACT_COUNT_CUTOFF environment variable).
 * 
 * @param size Response limit, or the number of acts to return
 * @param page Page offset number
 * @returns Array of attractions with type TMAttraction
 */
export const fetchAttractions = async (size: number = 100, page: number = 0): Promise<TMAttraction[]> => {
    // Build a url for the /attractions endpoint of Ticketmasters API
    let url = `https://${Env.TM_ATTRACTIONS_URL}?${ACT_SEARCH_PARAMS.toString()}&size=${size}&page=${page}`;
    let attractions: TMAttraction[] = [];
    // Request the top acts from ticketmaster
    await client.get(url).then((response: AxiosResponse) => {
        if (response.status != 200) throw new Error(`Request failed with code ${response.status}`);

        // Parse response into objects of type TMAct
        attractions = response.data._embedded.attractions.map((a: any) => parseAttraction(a));
        logger.info('Received attractions from Ticketmaster', {
            responseStatus: response.status,
            contentType: response.headers["Content-Type"],
            contentLength: response.headers["Content-Length"],
            count: attractions.length,
            timestamp: new Date(Date.now()).toISOString()
        });
    }).catch((err: any) => {
        logger.error("Failed to request attractions", {
            cause: err.message,
            url,
            timestamp: new Date(Date.now()).toISOString()
        });
    });
    return attractions;
}
