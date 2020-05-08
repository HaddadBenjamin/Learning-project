import {
    AuthentificationAction,
    AuthentificationActionTypes
} from "../actions/authentification.action";
import produce from "immer";

export interface IAuthentificationState
{
    isAuthentified : boolean,
    token? : string,
    username : string,
    errorMessage? : string,
}

export const authentificationInitialState : IAuthentificationState =
{
    isAuthentified : false,
    token : undefined,
    username : '',
    errorMessage : undefined
};

export default function authentificationReducer(state : IAuthentificationState = authentificationInitialState, action : AuthentificationAction)
{
    return produce(state, draft =>{
        switch (action.type) {
            case AuthentificationActionTypes.SIGNIN :
            case AuthentificationActionTypes.LOGIN :
            case AuthentificationActionTypes.LOGOUT :
                draft.errorMessage = undefined;
                break;

            case AuthentificationActionTypes.SIGNED:
            case AuthentificationActionTypes.LOGGED:
                console.log(action.payload);
                draft.isAuthentified = true;
                draft.username = action.payload.username;
                draft.token = action.payload.token;
                break;

            case AuthentificationActionTypes.SIGNING_FAILED :
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

            case AuthentificationActionTypes.LOGGING_OUT_FAILED:
                draft.errorMessage = action.payload.errorMessage;
                draft.isAuthentified = false;
                draft.token = undefined;
                draft.username = '';
                break;
        }
    })
}