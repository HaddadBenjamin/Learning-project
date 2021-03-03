import { ITodoFilters, Todo } from "./Todo.model"

export const filterTodosSelector = (todos : Todo[], filters : ITodoFilters) : Todo[] => todos.filter(todo =>
    todo.title.includes(filters.terms) &&
    (!todo.completed || !filters.onlyUncompleted))

export const sortTodosSelector = (todos : Todo[]) : Todo[] =>
    todos.sort((a, b) => (a === b) ? 0 : a.completed ? 1 : -1)

export const filterAndSortTodosSelector = (todos : Todo[], filters : ITodoFilters) : Todo[] =>
    sortTodosSelector(filterTodosSelector(todos, filters))