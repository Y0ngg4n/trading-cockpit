export interface ApplicationConfig {
    apiURL: string;
    loginUrl: string;
    registerUrl: string;
}

export const CONFIG: ApplicationConfig = {
    apiURL: 'http://localhost:3100',

    loginUrl: "/accounts/login",
    registerUrl: "/accounts/register"
};