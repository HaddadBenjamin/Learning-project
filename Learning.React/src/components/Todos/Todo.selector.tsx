import { ITodoFilters, Todo } from "./todo.model"
import { filterTodos } from "./FilterTodos"
import { sortTodos } from "./sortTodos"
import { ITodosState } from "./todo.reducer";

const selectFilteredTodos = (state : ITodosState) : Todo[] => filterTodos(state.todos, state.filters);

export const selectFilteredAndSortedTodos = (state : ITodosState) : Todo[] => sortTodos(selectFilteredTodos(state))
export const selectFilters = (state : ITodosState) : ITodoFilters => state.filters