import { combineReducers } from 'redux'
import todoReducer, { initialTodoState, ITodosState } from './domains/todos/todo.reducer'

export interface IGlobalState
{
    todos : ITodosState
}

export const initialGlobalState : IGlobalState = { todos : initialTodoState }

export default combineReducers({ todos : todoReducer })