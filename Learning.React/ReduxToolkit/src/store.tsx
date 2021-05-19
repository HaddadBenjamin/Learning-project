import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import epicMiddleware, { rootEpic } from './root.epic'
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import todoReducer, { initialTodoState, ITodosState } from './domains/todos/todo.reducer'

export interface IGlobalState
{
    todos : ITodosState
}

const rootReducer = combineReducers({ reducer : { todos : todoReducer } })

const middlewares = composeWithDevTools({})(applyMiddleware(epicMiddleware))
const store = createStore(rootReducer, initialGlobalState, middlewares)

// @ts-ignore
epicMiddleware.run(rootEpic)

export default store

import { createSlice } from '@reduxjs/toolkit'

export const todosSlice = createSlice({
  name: 'todos',
  initialState: initialTodoState,
  reducers: {
    increment: (state) => {
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = todosSlice.actions
export const todosSlice.reducer
export default store