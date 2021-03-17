import { ITodo } from './todo.model'
import { newGuid } from '../../shared/helpers/stringHelpers'

export const createTodo = (title : string) : ITodo => {
    return { id : newGuid(), title : title, completed : false } }