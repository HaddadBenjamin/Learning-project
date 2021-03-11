import { filterTodos } from './filterTodos'
import { sortTodos } from './sortTodos'
import { IGlobalState } from '../../rootReducer'
import { ITodoFilters, ITodo } from './todo.model'
import { ITodosState } from './todo.reducer'
import { Draft } from 'immer'

const selectFilteredTodos = (state : IGlobalState) : ITodo[] => filterTodos(state.todos.todos, state.todos.filters)

export const selectFilteredAndSortedTodos = (state : IGlobalState) : ITodo[] => sortTodos(selectFilteredTodos(state))
export const selectFilters = (state : IGlobalState) : ITodoFilters => state.todos.filters

export const selectDraftTodoOrThrow = (draft : Draft<ITodosState>, id : string) : Draft<ITodo> =>
{
    const todo = draft.todos.find(todo => todo.id === id)

    if (!todo)
        throw new Error(`Todo ${id} do not exists`)

    return todo
}