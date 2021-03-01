import React from 'react'
import Todo from './Todo'
import { TodoActions } from './Todo.action'

export type Props
{
    todo : Todo,
    dispatch : React.Dispatch<TodoActions>
}

const TodoRow = ({ todo, dispatch } : Props) =>
{
    return <>
        {JSON.stringify(todo)}
    </>
}

export default TodoRow