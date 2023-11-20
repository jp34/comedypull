import Env from "./config/env";
import axios from "axios";
import { TMAct } from "./entity/act";

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
    let acts: TMAct[] = [];
    await axios.get(url).then((response) => {
        if (response.status != 200) throw new Error(`Request failed with code ${response.status}`);
        acts = response.data._embedded.attractions.map((a: any) => ({
            id: a.id,
            name: a.name,
            url: a.url,
            locale: a.locale
        }));
    });
    return acts;
}
