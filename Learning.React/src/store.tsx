import { createStore } from 'redux'
import rootReducer, { initialGlobalState } from './rootReducer'

const store = createStore(rootReducer, initialGlobalState)

export default store