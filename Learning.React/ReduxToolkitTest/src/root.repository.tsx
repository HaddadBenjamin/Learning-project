import todoRepository, { ITodoRepository } from './domains/todos/todo.repository'

export interface IRootRepository
{
    todo : ITodoRepository
}

export default class rootRepository implements IRootRepository
{
    todo : ITodoRepository = new todoRepository()
}