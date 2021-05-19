import todoApi, { ITodoApi } from './domains/todos/todo.api'

export interface IRootApi
{
    readonly todo : ITodoApi
}

export default class rootApi implements IRootApi
{
    todo : ITodoApi = new todoApi()
}