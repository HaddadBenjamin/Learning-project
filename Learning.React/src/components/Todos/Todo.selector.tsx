import { ITodoFilters, Todo } from './todo.model'
import { filterTodos } from './filterTodos'
import { sortTodos } from './sortTodos'
import { IGlobalState } from '../../rootReducer'

const selectFilteredTodos = (state : IGlobalState) : Todo[] => filterTodos(state.todos.todos, state.todos.filters)

export const selectFilteredAndSortedTodos = (state : IGlobalState) : Todo[] => sortTodos(selectFilteredTodos(state))
export const selectFilters = (state : IGlobalState) : ITodoFilters => state.todos.filters