import { ITodoFilters, ITodo } from './todo.model'
import actionCreatorFactory from 'typescript-fsa'

export enum TodoActions
{
    GET_TODO = "todo/get",
    GET_TODO_STARTED = "todo/get_STARTED",
 
    CREATE_TODO = "todo/create",
    CREATE_TODO_STARTED = "todo/create_STARTED",

    UPDATE_TODO = "todo/update",
    UPDATE_TODO_STARTED = "todo/update_STARTED",

    TOGGLE_TODO = "todo/toggle",
    TOGGLE_TODO_STARTED = "todo/toggle_STARTED",

    DELETE_TODO = "todo/delete",
    DELETE_TODO_STARTED = "todo/delete_STARTED",

    UPDATE_TODO_FILTERS = "todo/update/filters",
    UPDATE_TODO_FILTERS_STARTED = "todo/update/filters_STARTED"
}

export interface IGetTodosAction { }
export interface IGotTodosAction { todos : ITodo[] }
export interface IGetTodosFailedAction { errorMessage : string }
export const getTodos = actionCreatorFactory().async<
    IGetTodosAction, IGotTodosAction, IGetTodosFailedAction>(TodoActions.GET_TODO)

export interface ICreateTodoAction { title : string }
export interface ICreatedTodoAction { todo : ITodo }
export interface ICreateTodoFailedAction { errorMessage : string }
export const createTodo = actionCreatorFactory().async<
    ICreateTodoAction, ICreatedTodoAction, ICreateTodoFailedAction>(TodoActions.CREATE_TODO)

export interface IUpdateTodoAction { id : string, newTitle : string }
export interface IUpdatedTodoAction { todo : ITodo }
export interface IUpdateTodoFailedAction { errorMessage : string }
export const updateTodo = actionCreatorFactory().async<
    IUpdateTodoAction, IUpdatedTodoAction, IUpdateTodoFailedAction>(TodoActions.UPDATE_TODO)

export interface IToggleTodoAction { id : string }
export interface IToggledTodoAction { todo : ITodo }
export interface IToggleTodoFailedAction { errorMessage : string }
export const toggleTodo = actionCreatorFactory().async<
    IToggleTodoAction, IToggledTodoAction, IToggleTodoFailedAction>(TodoActions.TOGGLE_TODO)

export interface IDeleteTodoAction { id : string }
export interface IDeletedTodoAction { id : string }
export interface IDeleteTodoFailedAction { errorMessage : string }
export const deleteTodo = actionCreatorFactory().async<
    IDeleteTodoAction, IDeletedTodoAction, IDeleteTodoFailedAction>(TodoActions.DELETE_TODO)

export interface IUpdateTodoFiltersAction { filters : ITodoFilters }
export const updateTodoFilters = actionCreatorFactory()<IUpdateTodoFiltersAction>(TodoActions.UPDATE_TODO_FILTERS)