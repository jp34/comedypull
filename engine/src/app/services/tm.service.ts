import Env from "../../config/env";
import logger from "../../config/logger";
import axios, { AxiosResponse } from "axios";
import axiosRateLimit from "axios-rate-limit";
import { TMImage, TMAttraction, TMEvent, TMVenue, TMAddress, TMGeo } from "../models";

const client = axiosRateLimit(axios.create(), { maxRPS: 5 });

const parseImages = (images: any[]): TMImage[] => {
    let parsed: TMImage[] = [];
    if (images != null) {
        images.forEach((i: any) => {
            return {
                ratio: i.ratio,
                url: i.url,
                width: i.width,
                height: i.height
            }
        });
    }
    return parsed;
}

const parseAttraction = (a: any): TMAttraction => {
    // If the object contains images, extract them as well
    let images: TMImage[] = parseImages(a.images);
    return {
        id: a.id,
        name: a.name,
        url: a.url,
        locale: a.locale,
        images
    };
}

const parseVenue = (v: any): TMVenue => {
    let address: TMAddress = {
        address: v.address.line1,
        city: v.city.name,
        post_code: v.postalCode,
        state: {
            name: v.state.name,
            code: v.state.stateCode
        },
        country: {
            name: v.country.name,
            code: v.state.countryCode
        }
    };

    let geo: TMGeo = {
        latitude: v.location.latitude,
        longitude: v.location.longitude
    }

    return {
        id: v.id,
        url: v.url,
        name: v.name,
        locale: v.locale,
        address,
        geo
    }
}

const parseEvent = (e: any): TMEvent => {
    let images: TMImage[] = parseImages(e.images);
    let venue: TMVenue = parseVenue(e._embedded.venues[0]);
    return {
        id: e.id,
        url: e.url,
        act_id: e._embedded.attractions[0].id,
        name: e.name,
        start_date: e.dates.start.dateTime,
        timezone: e.dates.timezone,
        locale: e.locale,
        images,
        venue
    }
}

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
 * This function makes a GET request to the Ticketmaster API and fetches the top (N) attractions
 * by relevance within the US.
 * 
 * @param size Response limit, or the number of acts to return
 * @param page Page offset number
 * @returns Array of attractions with type TMAttraction
 */
export const fetchAttractions = async (size: number = 100, page: number = 0): Promise<TMAttraction[]> => {
    // Build a url for the /attractions endpoint of Ticketmasters API
    const params: URLSearchParams = buildAttractionSearchParams(size, page);
    const url: string = `https://${Env.TM_ATTRACTIONS_URL}?${params.toString()}`;
    let attractions: TMAttraction[] = [];
    // Request the top acts from ticketmaster
    await client.get(url).then((response: AxiosResponse) => {
        if (response.status != 200) throw new Error(`Request failed with code ${response.status}`);

        // Parse response into objects of type TMAttraction
        attractions = response.data._embedded.attractions.map((a: any) => parseAttraction(a));
    }).catch((err: any) => {
        logger.error("Failed to request attractions", {
            cause: err.message,
            url,
            timestamp: new Date(Date.now()).toISOString()
        });
    });
    return attractions;
}

export const fetchEventsById = async (id: string, size: number = 50, page: number = 0): Promise<TMEvent[]> => {
    const params: URLSearchParams = buildEventSearchParams(id, size, page);
    const url: string = `https://${Env.TM_EVENTS_URL}?${params.toString()}`;
    let events: TMEvent[] = [];
    await client.get(url).then((response: AxiosResponse) => {
        if (response.status != 200) throw new Error(`Request failed with code ${response.status}`);

        // Parse response into objects of tupe TMEvent
        events = response.data._embedded.events.map((e: any) => parseEvent(e));
    }).catch((err: any) => {
        logger.error("Failed to request events", {
            cause: err.message,
            url,
            timestamp: new Date(Date.now()).toISOString()
        });
    });
    return events;
}