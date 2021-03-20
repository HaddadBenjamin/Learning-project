import todoApi, { ITodoApi } from './domains/todos/todo.api'

export interface IRootApi
{
    readonly todo : ITodoApi
}

export default class RootApi implements IRootApi
{
    todo : ITodoApi = new todoApi()
}