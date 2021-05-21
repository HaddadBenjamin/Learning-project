import React from 'react'
import ITodo from './todo.model'

const Todo = ({ title, checked} : ITodo) =>
{
    return <div>
        checked : { checked }
        title : { title }
    </div>
}

export default Todo