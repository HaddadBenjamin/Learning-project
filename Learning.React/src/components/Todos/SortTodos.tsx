import { Todo } from './Todo.model'

export const sortTodos = (todos : Todo[]) : Todo[] =>
    todos.sort((a, b) => (a === b) ? 0 : a.completed ? 1 : -1)