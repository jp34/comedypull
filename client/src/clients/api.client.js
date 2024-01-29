import client from "config/axios.config";

export const fetchNearbyShows = async (latitude, longitude, n) => {
    try {
        const params = new URLSearchParams({ latitude, longitude, size: n });
        const response = await client.get(`/s?${params.toString()}`);
        return response.data;
    } catch (error) {
        console.log(`Failed to request nearby shows - ${error.message}`);
        console.log(error.stack);
        return [];
    }
}
