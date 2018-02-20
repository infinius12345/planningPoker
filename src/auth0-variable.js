import config from "./config.json"
console.log("config",config);
const AUTH0_DOMAIN = config.AUTH0_DOMAIN;
const AUTH0_CLIENT_ID = config.AUTH0_CLIENT_ID;
const URL = config.URL;

export const AUTH_CONFIG = {
    domain: AUTH0_DOMAIN,
    clientId: AUTH0_CLIENT_ID,
    callbackUrl: URL
};