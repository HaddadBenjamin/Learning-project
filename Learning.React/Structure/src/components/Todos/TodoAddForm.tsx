import React, { useState } from 'react'
import TextInput from '../../shared/components/TextInput'
import { createTodo, TodoActions } from './Todo.action'

export type Props =
{
    dispatch : React.Dispatch<TodoActions>
}

const TodoAddForm = ({ dispatch } : Props) =>
{
    const [title, setTitle] = useState<string>('');
    
    const handleOnTitleChange = (value : string, id : string) : void => setTitle(value)
    const handleSubmit = (event : React.FormEvent) : void =>
    {
        event.preventDefault()
        dispatchCreateTodo()
    }
    const dispatchCreateTodo = () =>
    {
        dispatch(createTodo(title))
        setTitle('')
    } 
    const handleOnClick = () => dispatchCreateTodo()

    return <form onSubmit={handleSubmit}>
        <button type="button" className="btn btn-dark" onClick={handleOnClick}>
            <i className="fas fa-plus"></i>
        </button>

        <TextInput
            id="AddTodo"
            label="Create a new todo"
            placeholder="title..."
            value={title}
            onChange={handleOnTitleChange}/>
    </form>
}

export default TodoAddForm