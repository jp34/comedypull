import Env from "../config/env";
import logger from "../config/logger";
import { TMAct, TMImage, TMShow, TMVenue, TMAddress, TMLocation } from "../models";
import axios, { AxiosResponse } from "axios";
import axiosRateLimit from "axios-rate-limit";

// Ticketmaster Discovery API enforces a maximum of 5 requests per second 
const client = axiosRateLimit(axios.create(), { maxRPS: Env.TM_RATE_LIMIT });

/**
 * Returns a URLSearchParams object defining a query that returns a number of acts
 * with the individual comedian subgenre id. Supports pagination and response size.
 * 
 * @param size Number of acts to return
 * @param page Page of acts to return
 * @returns URLSearchParams
 */
const buildAttractionSearchParams = (size: number, page: number): URLSearchParams => {
    return new URLSearchParams({
        apikey: Env.TM_API_KEY,
        locale: "en-us,en",
        sort: "relevance,desc",
        subGenreId: Env.TM_SUBGENRE_ID,
        size: size.toString(),
        page: page.toString()
    });
}

/**
 * Returns a URLSearchParams object defining a query that returns a number of events
 * for any given act. Will only return events with the individual comedian subgenre id.
 * Supports pagination and response size.
 * 
 * @param id Act ID to return events for
 * @param size Number of events to return
 * @param page Page of events to return
 * @returns URLSearchParams
 */
const buildEventSearchParams = (id: string, size: number, page: number): URLSearchParams => {
    return new URLSearchParams({
        apikey: Env.TM_API_KEY,
        locale: "en-us,en",
        sort: "date,asc",
        subGenreId: Env.TM_SUBGENRE_ID,
        attractionId: id,
        size: size.toString(),
        page: page.toString()
    });
}

/**
 * Makes an axios request to Ticketmaster Discovery API for a list of individual comedians, sorted
 * by relevance. Requests the top 100 acts by default. This method will parse the response and return
 * an array of objects of type TMAct. Supports pagination.
 * 
 * @param size Number of acts to return
 * @param page Page of acts to return
 * @returns Array of TMAct
 */
export const fetchActs = async (size: number = 100, page: number = 0): Promise<Array<TMAct>> => {
    const params: URLSearchParams = buildAttractionSearchParams(size, page);
    const url: string = `https://${Env.TM_ATTRACTIONS_URL}?${params.toString()}`;
    const response: AxiosResponse = await client.get(url);
    logger.debug(`Axios Request - ${url}`, { status: response.status, method: response.config.method, url });
    if ((response.status != 200) || (response.data._embedded == undefined)) {
        return [];
    } else {
        const data: Array<any> = response.data._embedded.attractions;
        return data.map((a: any) => parseAct(a));
    }
}

/**
 * Makes an axios request to Ticketmaster Discovery API for a list of shows for a given comedian. Returns
 * the next 50 upcoming shows by default. Along with each show in the response, Ticketmaster will embed
 * the associated venue. As a result this method returns an array of TMShow and TMVenue pairs. Supports
 * pagination.
 * 
 * @param id Act ID to fetch shows for
 * @param size Number of shows to return
 * @param page Page of shows to return
 * @returns Array of TMShow, TMVenue pairs
 */
export const fetchShowsByActId = async (id: string, size: number = 50, page: number = 0): Promise<Array<[TMShow, TMVenue]>> => {
    const params: URLSearchParams = buildEventSearchParams(id, size, page);
    const url: string = `https://${Env.TM_EVENTS_URL}?${params.toString()}`;
    const response = await client.get(url);
    logger.debug(`Axios Request - ${url}`, { status: response.status, method: response.config.method, url });
    if ((response.status != 200) || (response.data._embedded == undefined)) {
        return [];
    } else {
        const data: Array<any> = response.data._embedded.events;
        return data.map((e: any) => parseShow(e));
    }
}

const parseAct = (obj: any): TMAct => {
    let images: TMImage[] = parseImages(obj.images);
    return {
        id: obj.id,
        url: obj.url,
        name: obj.name,
        locale: obj.locale,
        images
    }
}

const parseShow = (obj: any): [TMShow, TMVenue] => {
    let images: TMImage[] = parseImages(obj.images);
    let venue: TMVenue = parseVenue(obj._embedded.venues[0]);
    let show: TMShow = {
        id: obj.id,
        url: obj.url,
        actId: obj._embedded.attractions[0].id,
        venueId: venue.id,
        name: obj.name,
        timezone: obj.dates.timezone,
        locale: obj.locale,
        date: obj.dates.start.dateTime,
        location: venue.location,
        images,
    }
    return [show, venue];
}

const parseVenue = (obj: any): TMVenue => {
    let address: TMAddress = {
        address: obj.address.line1,
        city: obj.city.name,
        postCode: obj.postalCode,
        state: {
            name: obj.state?.name,
            code: obj.state?.stateCode
        },
        country: {
            name: obj.country.name,
            code: obj.country.countryCode
        }
    };

    let location: TMLocation = {
        type: "Point",
        coordinates: [
            parseFloat(obj.location.longitude),
            parseFloat(obj.location.latitude)
        ]
    }

    let images: TMImage[] = parseImages(obj.images);

    return {
        id: obj.id,
        url: obj.url,
        name: obj.name,
        locale: obj.locale,
        address,
        location,
        images
    }
}

const parseImage = (obj: any): TMImage => {
    return {
        ratio: obj.ratio,
        url: obj.url,
        width: obj.width,
        height: obj.height
    }
}

const parseImages = (images: any[]): Array<TMImage> => {
    if (images == null) return [];
    return images.map((i: any) => parseImage(i));
}
