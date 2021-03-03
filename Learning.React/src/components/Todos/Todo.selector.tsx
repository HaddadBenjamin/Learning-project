import { Todo } from "./Todo.model"
import { ITodosState } from "./Todo.reducer"

const selectFilteredTodos = (state : ITodosState) : Todo[] =>
{
    const { todos, filters } = state;

    return todos.filter(todo =>
        todo.title.includes(filters.terms) &&
        (!todo.completed || !filters.onlyUncompleted))
} 

// Est-ce que cette fonction est un sélecteur ? elle ne prend pas l'état en paramètre.
const sortTodos = (todos : Todo[]) : Todo[] =>
    todos.sort((a, b) => (a === b) ? 0 : a.completed ? 1 : -1)

export const selectFilteredAndSortedTodos = (state : ITodosState) : Todo[] =>
    sortTodos(selectFilteredTodos(state))