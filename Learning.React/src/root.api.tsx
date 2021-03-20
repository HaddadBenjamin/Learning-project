import todoApi, { ITodoApi } from './domains/todos/todo.api'

export interface IRootApi
{
    readonly todos : ITodoApi
}

export default class RootApi implements IRootApi
{
    todos : ITodoApi = new todoApi()
}