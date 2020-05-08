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

    MICROSOFT_LOGIN = 'authentification/microsoft_login',
    MICROSOFT_LOGGED = 'authentification/microsoft_logged',
    MICROSOFT_LOGGING_FAILED = 'authentification/microsoft_logging_failed',

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
        username : string,
        password : string
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
        username : string,
        password : string
    }
}

export interface ILoggingFailedAuthentificationAction
{
    type : AuthentificationActionTypes.LOGGING_FAILED,
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

export type AuthentificationAction =
    ISigninAuthentificationAction |
    ISignedAuthentificationAction |
    ISigningFailedAuthentificationAction |

    ILoginAuthentificationAction |
    ILoggedAuthentificationAction |
    ILoggingFailedAuthentificationAction |

    ILogoutAuthentificationAction |
    ILoggedOutAuhtentificationAction |
    ILoggingOutFailedAuthentificationAction;