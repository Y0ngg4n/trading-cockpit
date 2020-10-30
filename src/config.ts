export interface ApplicationConfig {
    apiURL: string;
    loginUrl: string;
    registerUrl: string;
    meUrl: string;
    updateApiKey: string;
    localSessionKey: string;
}

export interface AlphaVantage {
    getApiKeyUrl: string
    testApiKeyUrl: string
}

export const CONFIG: ApplicationConfig = {
    apiURL: 'http://localhost:3100',

    loginUrl: "/accounts/login",
    registerUrl: "/accounts/register",
    meUrl: "/accounts/me",
    updateApiKey: "/accounts/update/apikey",

    localSessionKey: "tc-session"
};

export const ALPHAVANTAGE: AlphaVantage = {
    getApiKeyUrl: "https://www.alphavantage.co/support/#api-key",
    testApiKeyUrl: "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=60min&apikey="
}