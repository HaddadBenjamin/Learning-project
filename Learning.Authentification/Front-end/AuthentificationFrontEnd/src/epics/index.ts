import {
    combineEpics,
    createEpicMiddleware,
} from 'redux-observable';
import {IGlobalState} from "../reducers";
import authentificationEpics from './authentification.epic'
import {ApplicationAction} from "../actions";

export const rootEpic = combineEpics(authentificationEpics);

export default createEpicMiddleware<ApplicationAction, ApplicationAction, IGlobalState>();