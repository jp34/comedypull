import Env from "../config/env";
import logger from "../config/logger";
import { TMAct, TMImage, TMShow, TMVenue, TMAddress, TMLocation } from "../models";
import axios, { AxiosResponse } from "axios";
import axiosRateLimit from "axios-rate-limit";

const client = axiosRateLimit(axios.create(), { maxRPS: Env.TM_RATE_LIMIT });

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

export const fetchActs = async (size: number = 100, page: number = 0): Promise<Array<TMAct>> => {
    const params: URLSearchParams = buildAttractionSearchParams(size, page);
    const url: string = `https://${Env.TM_ATTRACTIONS_URL}?${params.toString()}`;
    const response: AxiosResponse = await client.get(url);
    logger.debug(`Axios Request - ${url}`, { status: response.status, method: response.config.method, url });
    // If the request failed or there is no data available, return an empty array
    if ((response.status != 200) || (response.data._embedded == undefined))
        return [];
    // Otherwise, parse and return Array<TMAct>
    else
        return response.data._embedded.attractions.map((a: any) => parseAct(a));
}

export const fetchShowsByActId = async (id: string, size: number = 50, page: number = 0): Promise<Array<[TMShow, TMVenue]>> => {
    const params: URLSearchParams = buildEventSearchParams(id, size, page);
    const url: string = `https://${Env.TM_EVENTS_URL}?${params.toString()}`;
    const response = await client.get(url);
    logger.debug(`Axios Request - ${url}`, { status: response.status, method: response.config.method, url });
    // If the request failed or there is no data available, return an empty array
    if ((response.status != 200) || (response.data._embedded == undefined))
        return [];
    else
        return response.data._embedded.events.map((e: any) => parseShow(e));
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
