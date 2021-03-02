import ITodoFilters from "./TodoFilters"

export enum TodoActionTypes
{
    CREATE_TODO = "todo/create",
    UPDATE_TODO = "todo/update",
    TOGGLE_TODO = "todo/toggle",
    DELETE_TODO = "todo/delete",

    UPDATE_TODO_FILTERS = "todo/update/filters"
}

export interface ICreateTodoAction
{
    type : TodoActionTypes.CREATE_TODO
    payload :
    {
        title : string
    }
}

export interface IUpdateTodoAction
{
    type : TodoActionTypes.UPDATE_TODO
    payload :
    {
        id : string,
        newTitle : string
    }
}

export interface IToggleTodoAction
{
    type : TodoActionTypes.TOGGLE_TODO
    payload :
    {
        id : string
    }
}

export interface IDeleteTodoAction
{
    type : TodoActionTypes.DELETE_TODO
    payload :
    {
        id : string
    }
}

export interface IUpdateTodoFiltersAction
{
    type : TodoActionTypes.UPDATE_TODO_FILTERS
    payload : ITodoFilters
}

export function createTodo(title : string) : ICreateTodoAction
{
    return {
        type : TodoActionTypes.CREATE_TODO,
        payload :
        {
            title : title
        }
    }
}

export function updateTodo(id : string, title : string) : IUpdateTodoAction
{
    return {
        type : TodoActionTypes.UPDATE_TODO,
        payload :
        {
            id : id,
            newTitle : title
        }
    }
}

export function toggleTodo(id : string) : IToggleTodoAction
{
    return {
        type : TodoActionTypes.TOGGLE_TODO,
        payload :
        {
            id : id
        }
    }
}

export function deleteTodo(id : string) : IDeleteTodoAction
{
    return {
        type : TodoActionTypes.DELETE_TODO,
        payload :
        {
            id : id
        }
    }
}

export function updateTodoFilters(filters : ITodoFilters) : IUpdateTodoFiltersAction
{
    return {
        type : TodoActionTypes.UPDATE_TODO_FILTERS,
        payload : filters
    }
}

export type TodoActions = 
    ICreateTodoAction |
    IUpdateTodoAction |
    IToggleTodoAction |
    IDeleteTodoAction |
    IUpdateTodoFiltersAction