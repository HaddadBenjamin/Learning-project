import { applyMiddleware, createStore } from 'redux'
import rootReducer, { initialGlobalState } from './root.reducer'
import { composeWithDevTools } from 'redux-devtools-extension'
import epicMiddleware, { rootEpic } from './root.epic'

const middlewares = composeWithDevTools({})(applyMiddleware(epicMiddleware))
const store = createStore(rootReducer, initialGlobalState, middlewares)

// @ts-ignore
epicMiddleware.run(rootEpic)

export default store