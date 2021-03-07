import React from 'react'
import TodoTable from "./TodoTable"
import TodoTableFilters from "./TodoTableFilters"
import TodoAddForm from "./TodoAddForm"

const FilterableAndSearchableTodoTable = () =>
{   
   return <>
        <h2>CRUD & UseReducer & Structure & Tests & without Redux, middleware, immer, typescrpit-fsa, useCallback, useMemo </h2>
        <TodoTableFilters/>
        <TodoAddForm/>
        <TodoTable/>
    </>
}

export default FilterableAndSearchableTodoTable