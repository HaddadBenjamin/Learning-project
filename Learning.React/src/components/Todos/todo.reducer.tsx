import { createTodo, updateTodo, toggleTodo, deleteTodo, updateTodoFilters, getTodos } from './todo.action'
import { ITodoFilters, ITodo } from './todo.model'
import { newGuid } from '../../shared/helpers/stringHelpers'
import produce, { Draft } from 'immer'
import { isType } from 'typescript-fsa'
import { Action } from 'redux'
import ActionStatus from '../../shared/models/actionStatus'
import IActionMetadata from '../../shared/models/actionMetadata'

export interface ITodosState
{
    todos : ITodo[]
    filters : ITodoFilters
    getAction : IActionMetadata
    createAction : IActionMetadata
    updateAction : IActionMetadata
    toggleAction : IActionMetadata
    deleteAction : IActionMetadata
}

export const initialTodoState : ITodosState =
{
    todos : [],
    filters :
    {
        terms : '',
        onlyUncompleted : false
    },
    getAction : { errorMessage : null, status : ActionStatus.Loaded },
    createAction : { errorMessage : null, status : ActionStatus.Loaded },
    updateAction : { errorMessage : null, status : ActionStatus.Loaded },
    toggleAction : { errorMessage : null, status : ActionStatus.Loaded },
    deleteAction : { errorMessage : null, status : ActionStatus.Loaded }
}

const getTodoOrThrowError = (draft : Draft<ITodosState>, id : string) : Draft<ITodo> =>
{
    const todo = draft.todos.find(todo => todo.id === id)

    if (!todo)
        throw new Error("Cannot find todo with id: " + id)

    return todo
}

// With Immer & Typescript-fsa
export default (state : ITodosState = initialTodoState, action : Action) => produce(state, draft => 
{
    if (isType(action, getTodos.started))   draft.getAction =    { status : ActionStatus.Loading, errorMessage : null }
    if (isType(action, createTodo.started)) draft.createAction = { status : ActionStatus.Loading, errorMessage : null }
    if (isType(action, updateTodo.started)) draft.updateAction = { status : ActionStatus.Loading, errorMessage : null }
    if (isType(action, toggleTodo.started)) draft.toggleAction = { status : ActionStatus.Loading, errorMessage : null }
    if (isType(action, deleteTodo.started)) draft.deleteAction = { status : ActionStatus.Loading, errorMessage : null }
    
    if (isType(action, getTodos.failed))    draft.getAction =    { status : ActionStatus.Failed, errorMessage : action.payload.error.errorMessage }
    if (isType(action, createTodo.failed))  draft.createAction = { status : ActionStatus.Failed, errorMessage : action.payload.error.errorMessage }
    if (isType(action, updateTodo.failed))  draft.updateAction = { status : ActionStatus.Failed, errorMessage : action.payload.error.errorMessage }
    if (isType(action, toggleTodo.failed))  draft.toggleAction = { status : ActionStatus.Failed, errorMessage : action.payload.error.errorMessage }
    if (isType(action, deleteTodo.failed))  draft.deleteAction = { status : ActionStatus.Failed, errorMessage : action.payload.error.errorMessage }
    
    if (isType(action, getTodos.done))   {  draft.getAction.status = ActionStatus.Loaded;     draft.todos = action.payload.result.todos }
    if (isType(action, createTodo.done)) {  draft.createAction.status = ActionStatus.Loaded;  draft.todos.push(action.payload.result.todo) }
    if (isType(action, updateTodo.done)) {  const { todo } = action.payload.result;
                                            draft.updateAction.status = ActionStatus.Loaded;  getTodoOrThrowError(draft, todo.id).title = todo.title }
    if (isType(action, toggleTodo.done)) {  const { todo } = action.payload.result
                                            draft.toggleAction.status = ActionStatus.Loaded;  getTodoOrThrowError(draft, todo.id).completed = todo.completed }
    if (isType(action, deleteTodo.done)) {  const { id } = action.payload.result
                                            draft.deleteAction.status = ActionStatus.Loaded;  draft.todos = draft.todos.filter(todo => todo.id !== id) }

    if (isType(action, updateTodoFilters))
        draft.filters = action.payload.filters
})

// Without Immer & Typescript-fsa
// export default function todoReducer(state : ITodosState = initialTodoState, action : TodoActions) : ITodosState
// {   
//     switch (action.type)
//     {
//         case TodoActionTypes.CREATE_TODO :
//             return {
//                 ...state,
//                 todos : [ ...state.todos, { id : newGuid(), title : action.payload.title, completed : false } ]
//             }

//         case TodoActionTypes.UPDATE_TODO :
//             return { 
//                 ...state,
//                 todos : state.todos.map(todo => todo.id === action.payload.id ?
//                                     { ...todo, title : action.payload.newTitle } : todo)
//             }

//         case TodoActionTypes.TOGGLE_TODO :
//             return { 
//                 ...state, 
//                 todos : state.todos.map(todo => todo.id === action.payload.id ?
//                                         { ...todo, completed : !todo.completed } : todo)
//             }
       
//         case TodoActionTypes.DELETE_TODO :
//             return { ...state, todos : state.todos.filter(todo => todo.id !== action.payload.id) }

//         case TodoActionTypes.UPDATE_TODO_FILTERS :
//             return { ...state, filters : { ...action.payload } }

//         // Without this line, the state is undefined at first init
//         default : return state
//     }
// }