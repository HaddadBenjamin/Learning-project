import { ITodoFilters, Todo } from "./todo.model"

export const filterTodos = (todos : Todo[], filters : ITodoFilters) : Todo[] => todos.filter(todo =>
    todo.title.includes(filters.terms) &&
    (!todo.completed || !filters.onlyUncompleted))