import { nanoid } from '@reduxjs/toolkit'
import React, { useState } from 'react'
// import { useAppDispatch, createTodo } from '../../store'

const AddTodoForm = () =>
{
    const [title, setTitle] = useState<string>('')
    // const dispatch = useAppDispatch()

    const dispatchCreateTodo = () =>
    {
        // dispatch(createTodo({ id : nanoid(), title,  checked : false }))
        setTitle('')
    } 
    const handleOnClick = () => dispatchCreateTodo()

    return <>
        Value : <input type="text" value={title} />
        <button onClick={handleOnClick}>Envoyer</button>
    </>
}

export default AddTodoForm