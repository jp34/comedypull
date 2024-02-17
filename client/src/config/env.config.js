
// Load environment variables
export const ENV = process.env.REACT_APP_ENV;
export const API_URL = process.env.REACT_APP_API_URL;

// Validate variables were defined
if (ENV === undefined)
    throw new Error("Missing environment variable: REACT_APP_ENV");
if (API_URL === undefined)
    throw new Error("Missing environment variable: REACT_APP_API_URL");
