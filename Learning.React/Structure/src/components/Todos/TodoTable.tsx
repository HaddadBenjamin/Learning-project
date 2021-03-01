import React from 'react'
import Todo from './Todo'
import { TodoActions } from './Todo.action'
import TodoRow from './TodoRow'

interface Props
{
    todos : Todo[]
    dispatch : React.Dispatch<TodoActions>
}

const TodoTable = React.memo<Props>(({ todos, dispatch }) =>
{
    return <table className="table table-dark table-striped mt-4">
        <thead>
        <tr>
            <th>Completed</th>
            <th>Title</th>
            <th>Publish edition</th>
            <th>Remove</th>
        </tr>
        </thead>
        <tbody>{todos.map(todo =>
            <TodoRow 
                key={todo.id} 
                todo={todo} 
                dispatch={dispatch}/>)}
        </tbody>
    </table>
})

export default TodoTable