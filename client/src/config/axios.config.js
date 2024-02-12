import axios from "axios";
import {
    BadRequestError,
    NotFoundError,
    TooManyRequestsError,
    UnauthorizedError
} from "models";

const client = axios.create({
    baseURL: `http://20.42.93.82/api/v1`,
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
