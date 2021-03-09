import { ITodo } from './todo.model'

export const sortTodos = (todos : ITodo[]) : ITodo[] =>
    todos.sort((a, b) => (a === b) ? 0 : a.completed ? 1 : -1)