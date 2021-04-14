import { combineReducers, createStore } from 'redux'
import todoReducer, { initialTodoState, ITodosState } from './components/todo.reducer'

export interface IGlobalState { todos : ITodosState}
const rootReducer = combineReducers({ todos : todoReducer } )

const store = createStore(rootReducer, {todos : initialTodoState})

export default store