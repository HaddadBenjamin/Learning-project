import React from 'react'
import AddTodoForm from './AddTodoForm'
import Todo from './Todo'
// import { selectTodos } from '../../store'
import ITodo from './todo.model'

const TodoList = () =>
{
    // const todos = selectTodos()
     const todos = [
        { id : '1', title : 'Faire la bouffe', checked : false },
        { id : '2', title : 'Faire la bouffe2', checked : false },
        { id : '3', title : 'Faire la bouffe3', checked : false }]
    
    return <div>
        <AddTodoForm/>
        {todos.map(todo => <Todo {...todo}/>)}
    </div>
}

export default TodoList