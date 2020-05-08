import {combineReducers} from "redux";
import {
    authentificationInitialState,
    IAuthentificationState
} from "./authentification.reducer";

export interface IGlobalState
{
    authentification : IAuthentificationState
}

export const initialState : IGlobalState =
{
    authentification : authentificationInitialState
};

export default combineReducers({
});