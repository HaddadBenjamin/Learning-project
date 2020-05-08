import {
    combineEpics,
    createEpicMiddleware,
    Epic,
} from 'redux-observable';
import {IGlobalState} from "../reducers";
import {ApplicationAction} from "../actions";

type SuggestionEpic = Epic<ApplicationAction, ApplicationAction, IGlobalState>;

const getAllSuggestionsEpic: SuggestionEpic = (action$, state$) => action$.pipe(
);

export const rootEpic = combineEpics(getAllSuggestionsEpic);

export default createEpicMiddleware<ApplicationAction, ApplicationAction, IGlobalState>();