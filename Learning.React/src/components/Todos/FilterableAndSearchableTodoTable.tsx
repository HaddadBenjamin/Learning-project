import { useReducer } from "react"
import todoReducer, { initialState } from "./Todo.reducer"
import React from 'react'
import TodoTable from "./TodoTable"
import TodoTableFilters from "./TodoTableFilters"
import TodoAddForm from "./TodoAddForm"
import { selectFilteredAndSortedTodos } from "./Todo.selector"

const FilterableAndSearchableTodoTable = () =>
{
    const [todoState, dispatch] = useReducer(todoReducer, initialState)
  
    return <>
        <h2>CRUD & UseReducer & Structure</h2>
        <div className="container col-8">
            <TodoTableFilters filters={todoState.filters} dispatch={dispatch}/>
            <TodoAddForm dispatch={dispatch}/>
            <TodoTable todos={selectFilteredAndSortedTodos(todoState)} dispatch={dispatch}/>
        </div>
    </>

    // TODO -> 
    // - Optimisations : useMemo, useCallback, React.memo
    // - Highlight filter ?
}

export default FilterableAndSearchableTodoTable