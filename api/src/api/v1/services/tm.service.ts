import Env from "../../../config/env";
import { TMAct, TMParser, TMShow, TMVenue } from "../models";
import axios, { AxiosResponse } from "axios";
import axiosRateLimit from "axios-rate-limit";

const client = axiosRateLimit(axios.create(), { maxRPS: 5 });

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

export const fetchActs = async (size: number = 100, page: number = 0): Promise<TMAct[]> => {
    const params: URLSearchParams = buildAttractionSearchParams(size, page);
    const url: string = `https://${Env.TM_ATTRACTIONS_URL}?${params.toString()}`;
    const response: AxiosResponse = await client.get(url);
    if (response.status != 200) throw new Error(`Request failed with code ${response.status}`);
    const data: TMAct[] = response.data._embedded.attractions.map((a: any) => TMParser.parseAct(a));
    return data;
}

export const fetchShowsByActId = async (id: string, size: number = 50, page: number = 0): Promise<Array<[TMShow, TMVenue]>> => {
    const params: URLSearchParams = buildEventSearchParams(id, size, page);
    const url: string = `https://${Env.TM_EVENTS_URL}?${params.toString()}`;
    const response = await client.get(url);
    if (response.status != 200) throw new Error(`Request failed with code ${response.status}`);
    const data: Array<[TMShow, TMVenue]> = response.data._embedded.events.map((e: any) => TMParser.parseShow(e));
    return data;
}
