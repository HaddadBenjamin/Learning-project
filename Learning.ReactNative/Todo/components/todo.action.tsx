import ITodo from "./todo.model"

export enum TodoActions
{
    CREATE_TODO = "todo/create",
    UPDATE_TODO = "todo/update",
    TOGGLE_TODO = "todo/toggle",
    BOOKMARK_TODO = "todo/bookmark",
}

export interface ICreateTodo { type : TodoActions.CREATE_TODO, payload : { title : string } }
export interface IUpdateTodo { type : TodoActions.UPDATE_TODO, payload : { todo : ITodo } }
export interface IToggleTodo { type : TodoActions.TOGGLE_TODO, payload : { id : string } }
export interface IBookmarkTodo { type : TodoActions.BOOKMARK_TODO, payload : { id : string } }

export function createTodo(title : string): ICreateTodo
{
    return {
        type: TodoActions.CREATE_TODO,
        payload : { title : title }
    }
}

export function updateTodo(todo : ITodo): IUpdateTodo
{
    return {
        type: TodoActions.UPDATE_TODO,
        payload : { todo : todo }
    }
}

export function toggleTodo(id : string): IToggleTodo
{
    return {
        type: TodoActions.TOGGLE_TODO,
        payload : { id : id }
    }
}

export function bookmarkTodo(id : string): IBookmarkTodo
{
    return {
        type: TodoActions.BOOKMARK_TODO,
        payload : { id : id }
    }
}

export type TodosAction = ICreateTodo | IUpdateTodo | IToggleTodo | IBookmarkTodo