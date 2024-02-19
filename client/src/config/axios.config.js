import axios from "axios";
import { API_URL } from "./env.config";
import {
    BadRequestError,
    NotFoundError,
    TooManyRequestsError,
    UnauthorizedError
} from "models/error.model";

const client = axios.create({
    baseURL: API_URL,
    timeout: 2500
});

client.interceptors.response.use(null, (error) => {
    if (axios.isAxiosError(error)) {
        const message = error.response?.data?.error;
        switch (error.response?.status) {
            case 400: throw new BadRequestError(message);
            case 401: throw new UnauthorizedError(message);
            case 404: throw new NotFoundError(message);
            case 429: throw new TooManyRequestsError(message);
        }
    }
});

export default client;
