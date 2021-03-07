import { createStore } from 'redux'
import rootReducer, { initialGlobalState } from './rootReducer'
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(rootReducer, initialGlobalState, composeWithDevTools({})())

export default store