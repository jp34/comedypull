import axios from "axios";
import Env from "./config/env";
import logger from "./config/logger";

const main = async () => {
    const url = "app.ticketmaster.com/discovery/v2/attractions";
    const searchParams = new URLSearchParams({
        apikey: Env.API_KEY,
        locale: "en-us,en",
        size: "5",
        page: "0",
        sort: "relevance,desc",
        subGenreId: "KZazBEonSMnZfZ7vF17"
    });
    const full_url = `https://${url}?${searchParams.toString()}`;
    
    try {
        const response = await axios.get(full_url);
        if (response.status != 200) throw new Error("Failed to request attractions");

        const attractions: any[] = response.data._embedded.attractions;

        attractions.forEach((a: any) => {
            console.log(a);
        });

    } catch (err: any) {
        logger.error("Failed to get available attractions");
    }
}

main();