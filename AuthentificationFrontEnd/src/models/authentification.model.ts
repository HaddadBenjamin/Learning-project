export interface SigninResponse
{
    Username : string,
    Token : string
}

export interface LoginResponse
{
    Username : string,
    Token : string
}

export enum LoggedWith
{
    TheApplication = "the application",
    Google = "Google",
    Facebook = "Facebook"
}