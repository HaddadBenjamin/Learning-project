import React, { useState } from 'react'
import TextInput from '../../shared/components/TextInput'
import Button, { ButtonColor } from '../../shared/components/Button'
import { createTodo, TodoActions } from './Todo.action'

export type Props =
{
    dispatch : React.Dispatch<TodoActions>
}

const TodoAddForm = ({ dispatch } : Props) =>
{
    const [title, setTitle] = useState<string>('')
    
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
        <div className="d-flex justify-content-between align-content-center">
            <Button 
                onClick={handleOnClick} 
                color={ButtonColor.Dark} 
                icon='plus'
                classes='m-auto'/>

            <TextInput
                id="AddTodo"
                placeholder="title..."
                value={title}
                onChange={handleOnTitleChange}
                classes='flex-grow-1 ml-2'/>
        </div>
    </form>
}

export default TodoAddForm