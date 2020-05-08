import {
    combineEpics,
    Epic
} from "redux-observable";
import {AuthentificationAction} from "../actions";
import {IGlobalState} from "../reducers";

type AuthentificationEpic = Epic<AuthentificationAction, AuthentificationAction, IGlobalState>;

const loginAuthentificationEpic: AuthentificationEpic = (action$, state$) => action$.pipe(
);

export default combineEpics(loginAuthentificationEpic);