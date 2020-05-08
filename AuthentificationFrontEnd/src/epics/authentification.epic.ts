import {
    combineEpics,
    Epic
} from "redux-observable";
import {IGlobalState} from "../reducers";
import {AuthentificationAction} from "../actions/authentification.action";

type AuthentificationEpic = Epic<AuthentificationAction, AuthentificationAction, IGlobalState>;

const loginAuthentificationEpic: AuthentificationEpic = (action$, state$) => action$.pipe(
);

export default combineEpics(loginAuthentificationEpic);