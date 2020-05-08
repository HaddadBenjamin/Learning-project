import {combineReducers} from "redux";
import authentificationReducer, {
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
    authentification: authentificationReducer
});