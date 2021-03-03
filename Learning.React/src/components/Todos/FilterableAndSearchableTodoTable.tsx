import { useReducer } from "react"
import todoReducer, { initialState } from "./Todo.reducer"
import React from 'react'
import TodoTable from "./TodoTable"
import TodoTableFilters from "./TodoTableFilters"
import TodoAddForm from "./TodoAddForm"
import { filterAndSortTodosSelector } from "./Todo.selector"
import { Todo } from "./Todo.model"

const FilterableAndSearchableTodoTable = () =>
{
    const [todoState, dispatch] = useReducer(todoReducer, initialState)
  
    const filteredAndSortedTodos = () : Todo[] => filterAndSortTodosSelector(todoState.todos, todoState.filters)

    return <>
        <h2>CRUD & UseReducer & Structure</h2>
        <div className="container col-8">
            <TodoTableFilters filters={todoState.filters} dispatch={dispatch}/>
            <TodoAddForm dispatch={dispatch}/>
            <TodoTable todos={filteredAndSortedTodos()} dispatch={dispatch}/>
        </div>
    </>

    // TODO -> 
    // - Optimisations : useMemo, useCallback, React.memo
    // - Highlight filter ?
}

export default FilterableAndSearchableTodoTable