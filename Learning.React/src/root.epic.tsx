import { combineEpics, createEpicMiddleware } from 'redux-observable'
import todoEpic from './domains/todos/todo.epic'
import rootApi, { IRootApi } from './root.api'

export interface IEpicDependencies
{
    apis : IRootApi
}

const epicDependencies : IEpicDependencies = 
{
    apis : new rootApi()
}

export const rootEpic = combineEpics(todoEpic)

export default createEpicMiddleware({ dependencies : epicDependencies });