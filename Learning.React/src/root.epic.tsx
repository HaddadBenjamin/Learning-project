import { combineEpics, createEpicMiddleware } from 'redux-observable'
import todoEpic from './domains/todos/todo.epic'
import rootApi, { IRootApi } from './root.api'
import rootRepository, { IRootRepository } from './root.repository'

export interface IEpicDependencies
{
    apis : IRootApi
    repositories : IRootRepository
}

const epicDependencies : IEpicDependencies = 
{
    apis : new rootApi(),
    repositories : new rootRepository()
}

export const rootEpic = combineEpics(todoEpic)

export default createEpicMiddleware({ dependencies : epicDependencies })