import Env from "./config/env";
import axios, { AxiosResponse } from "axios";
import { Act } from "./entity/act";
import logger from "./config/logger";

const ACTS_URL = "app.ticketmaster.com/discovery/v2/attractions";
const ACTS_LIMIT = 10;

export const fetchActs = async (size: number = ACTS_LIMIT, page: number = 0): Promise<Act[]> => {
    const params = new URLSearchParams({
        apikey: Env.API_KEY,
        locale: "en-us,en",
        size: size.toString(),
        page: page.toString(),
        sort: "relevance,desc",
        subGenreId: "KZazBEonSMnZfZ7vF17"
    });
    let url = `https://${ACTS_URL}?${params.toString()}`;
    return await axios.get(url).then((response: AxiosResponse<any, any>) => {
        if (response.status != 200) throw new Error(`Request failed with code ${response.status}`);
        let entries = response.data._embedded.attractions;
        return entries.map((a: any) => {
            let act: Act = {
                ticketmasterId: a.id,
                name: a.name,
                dateCreated: new Date(Date.now()),
                dateModified: new Date(Date.now())
            };
            return act;
        });
    }).catch((err: any) => {
        logger.warn('Failed to fetch acts from ticketmaster', {
            cause: err.message,
            timestamp: Date.now()
        });
        return [];
    });
}