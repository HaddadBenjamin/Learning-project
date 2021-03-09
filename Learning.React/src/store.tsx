import { applyMiddleware, createStore } from 'redux'
import rootReducer, { initialGlobalState } from './rootReducer'
import { composeWithDevTools } from 'redux-devtools-extension'
import epicMiddleware, { rootEpic } from './rootEpic'

const middlewares = composeWithDevTools({})(applyMiddleware(epicMiddleware))
const store = createStore(rootReducer, initialGlobalState, middlewares)

epicMiddleware.run(rootEpic)

export default store