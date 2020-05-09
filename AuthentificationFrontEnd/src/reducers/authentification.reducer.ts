import {
    AuthentificationAction,
    AuthentificationActionTypes
} from "../actions/authentification.action";
import produce from "immer";
import {
    LoggedWith,
} from "../models/authentification.model";

export interface IAuthentificationState
{
    isAuthentified : boolean,
    token? : string,
    loggedWith : LoggedWith,
    username? : string,
    errorMessage? : string,
}

export const authentificationInitialState : IAuthentificationState =
{
    isAuthentified : false,
    token : undefined,
    loggedWith : LoggedWith.TheApplication,
    username : undefined,
    errorMessage : undefined
};

export default function authentificationReducer(state : IAuthentificationState = authentificationInitialState, action : AuthentificationAction)
{
    return produce(state, draft =>{
        switch (action.type) {
            case AuthentificationActionTypes.SIGNIN :
            case AuthentificationActionTypes.LOGIN :
            case AuthentificationActionTypes.GOOGLE_LOGIN :
            case AuthentificationActionTypes.LOGOUT :
                draft.errorMessage = undefined;
                break;

            case AuthentificationActionTypes.SIGNED:
            case AuthentificationActionTypes.LOGGED:
            case AuthentificationActionTypes.GOOGLE_LOGGED:
                draft.isAuthentified = true;
                draft.username = action.payload.username;
                draft.token = action.payload.token;

                switch (action.type)
                {
                    case AuthentificationActionTypes.SIGNED:
                    case AuthentificationActionTypes.LOGGED:
                        draft.loggedWith = LoggedWith.TheApplication;
                        break;

                    case AuthentificationActionTypes.GOOGLE_LOGGED:
                        draft.loggedWith = LoggedWith.Google;
                        break;
                }
                break;

            case AuthentificationActionTypes.SIGNING_FAILED :
            case AuthentificationActionTypes.LOGGING_OUT_FAILED:
            case AuthentificationActionTypes.GOOGLE_LOGGING_FAILED:
            case AuthentificationActionTypes.LOGGING_FAILED:
                draft.errorMessage = action.payload.errorMessage;
                draft.isAuthentified = false;
                draft.token = undefined;
                draft.username = '';
                break;

            case AuthentificationActionTypes.LOGGED_OUT :
                draft.isAuthentified = false;
                draft.token = undefined;
                draft.username = '';
                break;
        }
    })
}