export enum AuthentificationActionTypes
{
    SIGNIN = 'authentification/signin',
    SIGNED = 'authentification/signed',
    SIGNING_FAILED = 'authentification/signing_failed',

    LOGIN = 'authentification/login',
    LOGGED = 'authentification/logged',
    LOGGING_FAILED = 'authentification/logging_failed',

    GOOGLE_LOGIN = 'authentification/google_login',
    GOOGLE_LOGGED = 'authentification/google_logged',
    GOOGLE_LOGGING_FAILED = 'authentification/google_logging_failed',

    FACEBOOK_LOGIN = 'authentification/facebook_login',
    FACEBOOK_LOGGED = 'authentification/facebook_logged',
    FACEBOOK_LOGGING_FAILED = 'authentification/facebook_logging_failed',

    LOGOUT = 'authentification/logout',
    LOGGED_OUT = 'authentification/logged_out',
    LOGGING_OUT_FAILED = 'authentification/logging_out_failed',
}

export interface ISigninAuthentificationAction
{
    type : AuthentificationActionTypes.SIGNIN,
    payload : {
        username : string,
        password : string
    }
}

export interface ISignedAuthentificationAction
{
    type : AuthentificationActionTypes.SIGNED,
    payload : {
        token : string,
        username : string,
    }
}

export interface ISigningFailedAuthentificationAction
{
    type : AuthentificationActionTypes.SIGNING_FAILED,
    payload : {
        errorMessage : string
    }
}

export interface ILoginAuthentificationAction
{
    type : AuthentificationActionTypes.LOGIN,
    payload : {
        username : string,
        password : string
    }
}

export interface ILoggedAuthentificationAction
{
    type : AuthentificationActionTypes.LOGGED,
    payload : {
        token : string
        username : string,
    }
}

export interface ILoggingFailedAuthentificationAction
{
    type : AuthentificationActionTypes.LOGGING_FAILED,
    payload : {
        errorMessage : string
    }
}

export interface IGoogleLoginAuthentificationAction
{
    type : AuthentificationActionTypes.GOOGLE_LOGIN,
    payload : {
        tokenId : string
    }
}

export interface IGoogleLoggedAuthentificationAction
{
    type : AuthentificationActionTypes.GOOGLE_LOGGED,
    payload : {
        token : string
        username : string,
    }
}

export interface IGoogleLoggingFailedAuthentificationAction
{
    type : AuthentificationActionTypes.GOOGLE_LOGGING_FAILED,
    payload : {
        errorMessage : string
    }
}

export interface IFacebookLoginAuthentificationAction
{
    type: AuthentificationActionTypes.FACEBOOK_LOGIN,
    payload : {
        name : string,
        email : string
    }
}

export interface IFacebookLoggedAuthentificationAction
{
    type: AuthentificationActionTypes.FACEBOOK_LOGGED,
    payload : {
        token : string
        username : string,
    }
}

export interface IFacebookLoggingFailedAuthentificationAction
{
    type: AuthentificationActionTypes.FACEBOOK_LOGGING_FAILED,
    payload : {
        errorMessage : string
    }
}

export interface ILogoutAuthentificationAction
{
    type : AuthentificationActionTypes.LOGOUT
}

export interface ILoggedOutAuhtentificationAction
{
    type : AuthentificationActionTypes.LOGGED_OUT
}

export interface ILoggingOutFailedAuthentificationAction
{
    type : AuthentificationActionTypes.LOGGING_OUT_FAILED,
    payload : {
        errorMessage : string
    }
}

export function signIn(username : string, password : string) : ISigninAuthentificationAction
{
    return {
        type : AuthentificationActionTypes.SIGNIN,
        payload : {
            username : username,
            password : password
        }
    }
}

export function signed(token : string, username : string) : ISignedAuthentificationAction
{
    return {
        type : AuthentificationActionTypes.SIGNED,
        payload : {
            token : token,
            username : username
        }
    }
}

export function signingFailed(errorMessage : string) : ISigningFailedAuthentificationAction
{
    return {
        type : AuthentificationActionTypes.SIGNING_FAILED,
        payload : {
            errorMessage : errorMessage
        }
    }
}

export function login(username : string, password : string) : ILoginAuthentificationAction
{
    return {
        type : AuthentificationActionTypes.LOGIN,
        payload : {
            username : username,
            password : password
        }
    }
}

export function logged(token : string, username : string) : ILoggedAuthentificationAction
{
    return {
        type : AuthentificationActionTypes.LOGGED,
        payload : {
            token : token,
            username : username
        }
    }
}

export function loggingFailed(errorMessage : string) : ILoggingFailedAuthentificationAction
{
    return {
        type : AuthentificationActionTypes.LOGGING_FAILED,
        payload : {
            errorMessage : errorMessage
        }
    }
}

export function googleLogin(tokenId : string) : IGoogleLoginAuthentificationAction
{
    return {
        type : AuthentificationActionTypes.GOOGLE_LOGIN,
        payload : {
            tokenId : tokenId
        }
    }
}

export function googleLogged(token : string, username : string) : IGoogleLoggedAuthentificationAction
{
    return {
        type : AuthentificationActionTypes.GOOGLE_LOGGED,
        payload : {
            token : token,
            username : username
        }
    }
}

export function googleLoggingFailed(errorMessage : string) : IGoogleLoggingFailedAuthentificationAction
{
    return {
        type : AuthentificationActionTypes.GOOGLE_LOGGING_FAILED,
        payload : {
            errorMessage : errorMessage
        }
    }
}

export function facebookLogin(name : string, email : string) : IFacebookLoginAuthentificationAction
{
    return {
        type : AuthentificationActionTypes.FACEBOOK_LOGIN,
        payload : {
            name : name,
            email : email
        }
    }
}

export function facebookLogged(token : string, username : string) : IFacebookLoggedAuthentificationAction
{
    return {
        type : AuthentificationActionTypes.FACEBOOK_LOGGED,
        payload : {
            token : token,
            username : username
        }
    }
}

export function facebookLoggingFailed(errorMessage : string) : IFacebookLoggingFailedAuthentificationAction
{
    return {
        type : AuthentificationActionTypes.FACEBOOK_LOGGING_FAILED,
        payload : {
            errorMessage : errorMessage
        }
    }
}

export function logout() : ILogoutAuthentificationAction
{
    return {
        type : AuthentificationActionTypes.LOGOUT
    }
}

export function loggedOut() : ILoggedOutAuhtentificationAction
{
    return {
        type : AuthentificationActionTypes.LOGGED_OUT
    }
}

export function loggingOutFailed(errorMessage : string) : ILoggingOutFailedAuthentificationAction
{
    return {
        type : AuthentificationActionTypes.LOGGING_OUT_FAILED,
        payload : {
            errorMessage : errorMessage
        }
    }
}

export type AuthentificationAction =
    ISigninAuthentificationAction |
    ISignedAuthentificationAction |
    ISigningFailedAuthentificationAction |

    ILoginAuthentificationAction |
    ILoggedAuthentificationAction |
    ILoggingFailedAuthentificationAction |

    IGoogleLoginAuthentificationAction |
    IGoogleLoggedAuthentificationAction |
    IGoogleLoggingFailedAuthentificationAction |

    IFacebookLoginAuthentificationAction |
    IFacebookLoggedAuthentificationAction |
    IFacebookLoggingFailedAuthentificationAction |

    ILogoutAuthentificationAction |
    ILoggedOutAuhtentificationAction |
    ILoggingOutFailedAuthentificationAction;