import { combineEpics, createEpicMiddleware } from 'redux-observable'
import todoEpic from './components/Todos/todo.epic'

export const rootEpic = combineEpics(todoEpic)

export default createEpicMiddleware()