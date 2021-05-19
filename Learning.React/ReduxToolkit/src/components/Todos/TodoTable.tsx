import React from 'react'
import { useSelector } from 'react-redux'
import { selectFilteredAndSortedTodos } from '../../domains/todos/todo.selector'
import TodoRow from './TodoRow'

const TodoTable = React.memo(() =>
{
    const todos = useSelector(selectFilteredAndSortedTodos)
   
    return <> {todos.length > 0 && 
        <table className="table table-dark table-striped">
            <thead>
            <tr>
                <th>Completed</th>
                <th>Title</th>
                <th>Publish edition</th>
                <th>Remove</th>
            </tr>
            </thead>
            <tbody>{todos.map(todo =>
                <TodoRow key={todo.id} todo={todo}/>)}
            </tbody>
        </table>}
    </>
})

export default TodoTable