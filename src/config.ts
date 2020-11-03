export interface ApplicationConfig {
    apiURL: string;
    loginUrl: string;
    registerUrl: string;
    meUrl: string;
    updateApiKey: string;
    localSessionKey: string;
    localAPIKey: string;
}

export interface AlphaVantage {
    getApiKeyUrl: string
    testApiKeyUrl: string
}

export interface LemonMarkets {
    getApiKeyUrl: string
    websocketUrl: string
    searchUrl: string
    lastTickUrl: string
}

export const CONFIG: ApplicationConfig = {
    apiURL: 'http://localhost:3100',

    loginUrl: "/accounts/login",
    registerUrl: "/accounts/register",
    meUrl: "/accounts/me",
    updateApiKey: "/accounts/update/apikey",

    localSessionKey: "tc-session",
    localAPIKey:"lemon-markets-api-key"
};

export const ALPHAVANTAGE: AlphaVantage = {
    getApiKeyUrl: "https://www.alphavantage.co/support/#api-key",
    testApiKeyUrl: "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=60min&apikey="
}

export const LEMONMARKETS: LemonMarkets = {
    getApiKeyUrl: "https://app.lemon.markets/auth",
    websocketUrl: "wss://api.lemon.markets/streams/v1/marketdata",
    searchUrl: "https://api.lemon.markets/rest/v1/data/instruments/",
    lastTickUrl: "/ticks/latest/"
}