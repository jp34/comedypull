import client from "config/axios.config";

export const fetchNearbyShows = async (latitude, longitude, n) => {
    try {
        const params = new URLSearchParams({ latitude, longitude, size: n });
        const response = await client.get(`/nearby/shows?${params.toString()}`);
        return response.data;
    } catch (error) {
        console.log(`Failed to request nearby shows - ${error.cause}`);
        console.log(error.stack);
        return [];
    }
}

export const fetchUpcomingShows = async (n) => {
    try {
        const params = new URLSearchParams({ size: n });
        const response = await client.get(`/shows?${params.toString()}`)
        return response.data;
    } catch (error) {
        console.log(`Failed to request upcoming shows - ${error.cause}`);
        console.log(error.stack);
        return [];
    }
}

export const fetchNearbyVenues = async (latitude, longitude, n) => {
    try {
        const params = new URLSearchParams({ latitude, longitude, size: n });
        const response = await client.get(`/nearby/venues?${params.toString()}`);
        return response.data;
    } catch (error) {
        console.log(`Failed to request nearby venues - ${error.cause}`);
        console.log(error.stack);
        return [];
    }
}
