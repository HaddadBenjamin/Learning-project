import React from 'react'
import { TodoActions, updateTodoFilters } from './Todo.action'
import ITodoFilters from './TodoFilters'
import TextInput from "../../shared/components/TextInput";
import Checkbox from '../../shared/components/Checkbox';

export type Props =
{
    filters : ITodoFilters,
    dispatch : React.Dispatch<TodoActions>
}

const TodoTableFilters = ({ filters, dispatch } : Props) =>
{
    const onFiltersChange = (terms : string, onlyUncompleted : boolean) => dispatch(updateTodoFilters({ terms, onlyUncompleted }))
    const onTermsChange = (value : string, id : string) : void => onFiltersChange(value, filters.onlyUncompleted)
    const onOnlyCompletedChange = (isChecked : boolean, id : string) : void => onFiltersChange(filters.terms, isChecked)

    return <>
       <TextInput
            id="SearchTodo"
            placeholder="Search..."
            onChange={onTermsChange}
            defaultValue={filters.terms}/>
        <Checkbox
            id="FilterOnlyUncompletedTodo"
            label="Only uncompleted"
            checked={filters.onlyUncompleted}
            onChange={onOnlyCompletedChange}/>
    </>
}

export default TodoTableFilters