import React from 'react'
import { updateTodoFilters } from '../../domains/todos/todo.action'
import TextInput from '../../shared/components/TextInput'
import Checkbox from '../../shared/components/Checkbox'
import { useDispatch, useSelector } from 'react-redux'
import { selectFilters } from '../../domains/todos/todo.selector'

const TodoTableFilters = () =>
{
    const filters  = useSelector(selectFilters)
    const dispatch = useDispatch()
    const onFiltersChange = (terms : string, onlyUncompleted : boolean) => dispatch(updateTodoFilters({ filters : { terms, onlyUncompleted } }))
    const onTermsChange = (value : string, id : string) => onFiltersChange(value, filters.onlyUncompleted)
    const onOnlyCompletedChange = (isChecked : boolean, id : string) => onFiltersChange(filters.terms, isChecked)

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