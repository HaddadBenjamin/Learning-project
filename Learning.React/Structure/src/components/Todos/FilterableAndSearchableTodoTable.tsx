import { useEffect, useReducer, useState } from "react"
import todoReducer, { initialState } from "./Todo.reducer"
import React from 'react'
import TodoTable from "./TodoTable";
import TodoTableFilters from "./TodoTableFilters";
import TodoAddForm from "./TodoAddForm";
import { filterTodos } from "./TodoFilters";
import Todo from "./Todo";

const FilterableAndSearchableTodoTable = () =>
{
    const [todoState, dispatch] = useReducer(todoReducer, initialState)
    const [filteredTodos, setFilteredTodos] = useState<Todo[]>(filterTodos(todoState.todos, todoState.filters))
  
    useEffect(() => setFilteredTodos((filterTodos(todoState.todos, todoState.filters))), [todoState]);

    console.log(filteredTodos);

    return <>
        <h2>CRUD & UseReducer</h2>
        <div className="container col-8">
            <TodoTableFilters filters={todoState.filters} dispatch={dispatch}/>
            <TodoAddForm dispatch={dispatch}/>
            <TodoTable todos={filteredTodos} dispatch={dispatch}/>
        </div>
    </>

    // TODO -> 
    // - Fix icons
    // - Optimisations : useMemo, useCallback, React.memo
    // - Extract button from addform in a dedicated class & use it TodoRow & TodoAddForm
    // - Highlight filter ?
}

export default FilterableAndSearchableTodoTable