import React from 'react'
import Todo from './Todo'
import { TodoActions } from './Todo.action'
import TodoRow from './TodoRow'

export type Props =
{
    todos : Todo[],
    dispatch : React.Dispatch<TodoActions>
}

const TodoTable = ({ todos, dispatch } : Props) =>
{
    return <>
        { todos.map(todo => <TodoRow todo={todo} dispatch={dispatch}/>) }
    </>
}

export default TodoTable