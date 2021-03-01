import Todo from "./Todo";

export default interface ITodoFilters
{
    terms : string,
    onlyUncompleted : boolean
}

export const filterTodos = (todos : Todo[], filters : ITodoFilters) : Todo[] => todos.filter(todo =>
    todo.title.includes(filters.terms) &&
    (!todo.completed || !filters.onlyUncompleted))