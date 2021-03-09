import React from 'react'
import TodoTable from './TodoTable'
import TodoTableFilters from './TodoTableFilters'
import TodoAddForm from './TodoAddForm'

const FilterableAndSearchableTodoTable = () =>
{   
   return <>
        <h2>CRUD & Structure & Tests & Redux & middlewares & Immer & Typescript-fsa</h2>
        <TodoTableFilters/>
        <TodoAddForm/>
        <TodoTable/>
    </>
}

export default FilterableAndSearchableTodoTable