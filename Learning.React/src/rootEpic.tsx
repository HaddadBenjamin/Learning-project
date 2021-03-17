import { combineEpics, createEpicMiddleware } from 'redux-observable'
import todoEpic from './domains/todos/todo.epic'

export const rootEpic = combineEpics(todoEpic)

export default createEpicMiddleware()