import { ITodoFilters, ITodo } from './todo.model'
import produce from 'immer'
import { isType } from 'typescript-fsa'
import { Action } from 'redux'
import IActionMetadata from '../../shared/models/actionMetadata'
import { loadedActionMetadata, loadingActionMetadata, failedActionMetadataByAction } from '../../shared/models/actionMetadata'
import { createTodo, deleteTodo, getTodos, toggleTodo, updateTodo, updateTodoFilters } from './todo.action'
import { selectDraftTodoByIdOrThrow } from './todo.selector'

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
    getAction : loadedActionMetadata,
    createAction : loadedActionMetadata,
    updateAction : loadedActionMetadata,
    toggleAction : loadedActionMetadata,
    deleteAction : loadedActionMetadata
}

// With Immer & Typescript-fsa
export default (state : ITodosState = initialTodoState, action : Action) => produce(state, draft => 
{
    if (isType(action, getTodos.started))   draft.getAction =    loadingActionMetadata
    if (isType(action, createTodo.started)) draft.createAction = loadingActionMetadata
    if (isType(action, updateTodo.started)) draft.updateAction = loadingActionMetadata
    if (isType(action, toggleTodo.started)) draft.toggleAction = loadingActionMetadata
    if (isType(action, deleteTodo.started)) draft.deleteAction = loadingActionMetadata
    
    if (isType(action, getTodos.failed))    draft.getAction =    failedActionMetadataByAction(action)
    if (isType(action, createTodo.failed))  draft.createAction = failedActionMetadataByAction(action)
    if (isType(action, updateTodo.failed))  draft.updateAction = failedActionMetadataByAction(action)
    if (isType(action, toggleTodo.failed))  draft.toggleAction = failedActionMetadataByAction(action)
    if (isType(action, deleteTodo.failed))  draft.deleteAction = failedActionMetadataByAction(action)
    
    if (isType(action, getTodos.done))   {  draft.getAction = loadedActionMetadata;     draft.todos = action.payload.result.todos }
    if (isType(action, createTodo.done)) {  draft.createAction = loadedActionMetadata;  draft.todos.push(action.payload.result.todo) }
    if (isType(action, updateTodo.done)) {  const { todo } = action.payload.result
                                            draft.updateAction = loadedActionMetadata;  selectDraftTodoByIdOrThrow(draft, todo.id).title = todo.title }
    if (isType(action, toggleTodo.done)) {  const { todo } = action.payload.result
                                            draft.toggleAction = loadedActionMetadata;  selectDraftTodoByIdOrThrow(draft, todo.id).completed = todo.completed }
    if (isType(action, deleteTodo.done)) {  const { id } = action.payload.result
                                            draft.deleteAction = loadedActionMetadata;  draft.todos = draft.todos.filter(todo => todo.id !== id) }

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