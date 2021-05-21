import { ITodo } from './todo.model'
import { newGuid } from '../../shared/helpers/stringHelpers'

export interface ITodoRepository
{
    create(title : string) : ITodo
}

export default class todoRepository implements ITodoRepository
{
    create(title : string) : ITodo { return { id : newGuid(), title : title, completed : false } }
}