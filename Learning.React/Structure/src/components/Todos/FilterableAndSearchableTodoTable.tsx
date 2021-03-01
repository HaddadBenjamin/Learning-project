import { useReducer } from "react-bootstrap/node_modules/@types/react"
import todoReducer from "./Todo.reducer"
import React from 'react'
import TodoTable from "./TodoTable";
import TodoTableFilters from "./TodoTableFilters";

const FilterableAndSearchableTodoTable = () =>
{
    const [ todoState, dispatch ] = useReducer(todoReducer, undefined);

    return <>
        <TodoTableFilters filters={todoState.filters} dispatch={dispatch}/>
        <TodoAddForm dispatch={dispatch}/>
        <TodoTable todos={todoState.todos} dispatch={dispatch}/>
    </>

    // TodoAddForm
    // TodoTable
    // TodoRow

    // Optimisations : useMemo, useCallback, React.memo
}