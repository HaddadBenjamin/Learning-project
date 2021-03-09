import { ITodoFilters, ITodo } from './todo.model'

export const filterTodos = (todos : ITodo[], filters : ITodoFilters) : ITodo[] => todos.filter(todo =>
    todo.title.includes(filters.terms) &&
    (!todo.completed || !filters.onlyUncompleted))