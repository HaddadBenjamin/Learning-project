import React, { useState } from 'react'
import Checkbox from '../../shared/components/Checkbox'
import TextInput from '../../shared/components/TextInput'
import Todo from './Todo'
import { deleteTodo, TodoActions, toggleTodo, updateTodo } from './Todo.action'

interface Props
{
    todo : Todo
    dispatch : React.Dispatch<TodoActions>
}

const TodoRow = React.memo<Props>(({todo, dispatch}) =>
{
    const [title, setTitle] = useState<string>(todo.title);

    const onCompletedChange = (isChecked : boolean, id : string) => dispatch(toggleTodo(todo.id))
    const onTitleChange = (value : string, id : string) => setTitle(value)
    const handleOnClickOnPublishEdition = () => dispatch(updateTodo(todo.id, title))
    const handleOnClickOnDelete = () => dispatch(deleteTodo(todo.id))

    return <tr>
        <td>
            <Checkbox 
                id={`todo toggle ${todo.id}`}
                checked={todo.completed}
                onChange={onCompletedChange}/>
        </td>

        <td>
            <TextInput
                id={`todo input ${todo.id}`}
                defaultValue={todo.title}
                onChange={onTitleChange}/>
        </td>

        <td>
            <button type="button" className="btn btn-primary" onClick={handleOnClickOnPublishEdition} style={{width : '2.5rem'}}>
                <i className="fas fa-edit"></i>
            </button>
        </td>

        <td>
            <button type="button" className="btn btn-danger" onClick={handleOnClickOnDelete}>
                <i className="fas fa-trash"></i>
            </button>
        </td>
    </tr>
})

export default TodoRow