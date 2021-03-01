import { useEffect, useReducer, useState } from "react"
import todoReducer, { initialState } from "./Todo.reducer"
import React from 'react'
import TodoTable from "./TodoTable";
import TodoTableFilters from "./TodoTableFilters";
import TodoAddForm from "./TodoAddForm";
import { filterTodos } from "./TodoFilters";
import { sortTodos } from "./TodoSorter";
import Todo from "./Todo";

const FilterableAndSearchableTodoTable = () =>
{
    const [todoState, dispatch] = useReducer(todoReducer, initialState)
  
    const getFilteredAndSortedTodos = () : Todo[] => sortTodos(filterTodos(todoState.todos, todoState.filters));

    return <>
        <h2>CRUD & UseReducer</h2>
        <div className="container col-8">
            <TodoTableFilters filters={todoState.filters} dispatch={dispatch}/>
            <TodoAddForm dispatch={dispatch}/>
            <TodoTable todos={getFilteredAndSortedTodos()} dispatch={dispatch}/>
        </div>
    </>

    // TODO -> 
    // - Optimisations : useMemo, useCallback, React.memo
    // - Highlight filter ?
}

export default FilterableAndSearchableTodoTable