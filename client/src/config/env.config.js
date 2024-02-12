import { ConfigurationError } from "models";

const API_HOST = process.env.REACT_APP_API_HOST;
if (API_HOST === undefined) throw new ConfigurationError("Missing environment variable: API_HOST");

const API_PORT = process.env.REACT_APP_API_PORT;
if (API_PORT === undefined) throw new ConfigurationError("Missing environment variable: API_PORT");

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
if (API_BASE_URL === undefined) throw new ConfigurationError("Missing environment variable: API_BASE_URL");

const Env = {
    API_HOST,
    API_PORT,
    API_BASE_URL
}

export default Env;
