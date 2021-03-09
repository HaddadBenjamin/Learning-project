import { filterTodos } from './filterTodos'
import { sortTodos } from './sortTodos'
import { IGlobalState } from '../../rootReducer'
import { ITodoFilters, ITodo } from './todo.model'

const selectFilteredTodos = (state : IGlobalState) : ITodo[] => filterTodos(state.todos.todos, state.todos.filters)

export const selectFilteredAndSortedTodos = (state : IGlobalState) : ITodo[] => sortTodos(selectFilteredTodos(state))
export const selectFilters = (state : IGlobalState) : ITodoFilters => state.todos.filters