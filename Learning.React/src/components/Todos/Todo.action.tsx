import { ITodoFilters, Todo } from "./todo.model"
import actionCreatorFactory from 'typescript-fsa'

export enum TodoActions
{
    CREATE_TODO = "todo/create",

    CREATE_TODO_STARTED = "todo/create_STARTED",
    CREATE_TODO_DONE = "todo/create_DONE",
    CREATE_TODO_FAILED = "todo/create_FAILED",

    UPDATE_TODO = "todo/update",
    TOGGLE_TODO = "todo/toggle",
    DELETE_TODO = "todo/delete",

    UPDATE_TODO_FILTERS = "todo/update/filters"
}

export interface ICreateTodoAction { title : string }
export interface ICreatedTodoAction { todo : Todo }
export interface ICreateTodoFailedAction { errorMessage : string }
export const createTodo = actionCreatorFactory().async<
    ICreateTodoAction, ICreatedTodoAction, ICreateTodoFailedAction>(TodoActions.CREATE_TODO)

export interface IUpdateTodoAction { id : string, newTitle : string }
export const updateTodo = actionCreatorFactory()<IUpdateTodoAction>(TodoActions.UPDATE_TODO)

export interface IToggleTodoAction { id : string }
export const toggleTodo = actionCreatorFactory()<IToggleTodoAction>(TodoActions.TOGGLE_TODO)

export interface IDeleteTodoAction { id : string }
export const deleteTodo = actionCreatorFactory()<IDeleteTodoAction>(TodoActions.DELETE_TODO)

export interface IUpdateTodoFiltersAction { filters : ITodoFilters }
export const updateTodoFilters = actionCreatorFactory()<IUpdateTodoFiltersAction>(TodoActions.UPDATE_TODO_FILTERS)