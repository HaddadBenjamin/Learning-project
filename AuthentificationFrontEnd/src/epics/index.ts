import {
    combineEpics,
    createEpicMiddleware,
} from 'redux-observable';
import {IGlobalState} from "../reducers";
import {
    AuthentificationAction
} from "../actions";
import authentificationEpics from './authentification.epic'

type ApplicationAction = AuthentificationAction;

export const rootEpic = combineEpics(authentificationEpics);

export default createEpicMiddleware<ApplicationAction, ApplicationAction, IGlobalState>();