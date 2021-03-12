import TodoTable from './TodoTable'
import TodoTableFilters from './TodoTableFilters'
import TodoAddForm from './TodoAddForm'
import { useDispatch } from 'react-redux'
import { getTodos } from '../../domains/todos/todo.action'
import React, { useEffect } from 'react'

const FilterableAndSearchableTodoTable = () =>
{
    const dispatch = useDispatch()
    
    useEffect(() =>
    {
        async function effectAsync() { dispatch(getTodos.started({})) }
        effectAsync()
    }, [])

    return <>
        <h2 style={{paddingTop : '20px' }}>CRUD & Structure & Tests & Redux & middlewares & Immer & Typescript-fsa & Json-server & react testing library & jest</h2>
        <TodoTableFilters/>
        <TodoAddForm/>
        <TodoTable/>
    </>
}

export default FilterableAndSearchableTodoTable