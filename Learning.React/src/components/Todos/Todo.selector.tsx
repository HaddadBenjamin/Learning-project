import { Todo } from "./Todo.model"
import { ITodosState } from "./Todo.reducer"
import { sortTodos } from "./SortTodos"
import { filterTodos } from "./FilterTodos"

const selectFilteredTodos = (state : ITodosState) : Todo[] => filterTodos(state.todos, state.filters);

export const selectFilteredAndSortedTodos = (state : ITodosState) : Todo[] => sortTodos(selectFilteredTodos(state))