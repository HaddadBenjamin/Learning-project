import React, { useState } from 'react'
import TextInput from '../../shared/components/TextInput'
import { TodoActions } from './Todo.action'

export type Props =
{
    dispatch : React.Dispatch<TodoActions>
}

const TodoAddForm = ({ dispatch } : Props) =>
{
    const [title] = useState<string>('');
    
    // Form -> preventdefault
    // Input to update the new to do text
    // Button to send the form
    return <>
        <TextInput
            id="AddTodo"
            label="Create a new todo"
            placeholder="title..."
            defaultValue={title}
        />
    </>
}

export default TodoAddForm