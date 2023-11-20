import Env from "./config/env";
import axios, { AxiosResponse } from "axios";
import { Image, TMAct } from "./entity/act";
import logger from "./config/logger";

/**
 * This function makes a GET request to the Ticketmaster API and fetches the top (N) acts
 * by relevance within the US (Where N is defined by the ACT_COUNT_CUTOFF environment variable).
 * 
 * @param size Response limit, or the number of acts to return
 * @param page Page offset number
 * @returns Array of acts with type TMAct
 */
export const fetchActs = async (size: number = Env.ACT_COUNT_CUTOFF, page: number = 0): Promise<TMAct[]> => {
    const params = new URLSearchParams({
        apikey: Env.API_KEY,
        locale: "en-us,en",
        size: size.toString(),
        page: page.toString(),
        sort: "relevance,desc",
        subGenreId: "KZazBEonSMnZfZ7vF17"
    });
    let url = `${Env.API_URL}?${params.toString()}`;
    logger.info("Requesting acts from Ticketmaster", {
        params,
        url,
        timestamp: new Date(Date.now()).toISOString()
    });
    let acts: TMAct[] = [];
    await axios.get(url).then((response: AxiosResponse) => {
        if (response.status != 200) throw new Error(`Request failed with code ${response.status}`);
        acts = response.data._embedded.attractions.map((a: any) => {

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
        });
        logger.info('Received acts from Ticketmaster', {
            responseStatus: response.status,
            contentType: response.headers["Content-Type"],
            contentLength: response.headers["Content-Length"],
            count: acts.length,
            timestamp: new Date(Date.now()).toISOString()
        })
    }).catch((err: any) => {
        logger.error("Failed to request acts", {
            cause: err.message,
            params,
            url,
            timestamp: new Date(Date.now()).toISOString()
        });
    });
    return acts;
}
