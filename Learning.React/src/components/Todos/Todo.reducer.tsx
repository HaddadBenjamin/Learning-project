import { TodoActionTypes, TodoActions } from './todo.action'
import { ITodoFilters, Todo } from './todo.model'
import { newGuid } from '../../shared/helpers/stringHelpers'
import produce, { Draft } from 'immer'

export interface ITodosState
{
    todos : Todo[]
    filters : ITodoFilters
}

export const initialTodoState : ITodosState =
{
    todos : [
        { id : newGuid(), title : "Faire le lit", completed : false },
        { id : newGuid(), title : "Ranger le lave vaiselle", completed : false }
    ],
    filters :
    {
        terms : '',
        onlyUncompleted : false
    }
}

const getTodoOrThrowError = (draft : Draft<ITodosState>, id : string) : Draft<Todo> =>
{
    const todo = draft.todos.find(todo => todo.id)

    if (!todo)
        throw new Error("Cannot find todo with id: " + id)

    return todo
}
const getTodoIndexOrThrowError = (draft : Draft<ITodosState>, id : string) : number =>
{
    const todoIndex = draft.todos.findIndex(todo => todo.id)

    if (todoIndex === -1)
        throw new Error("Cannot find todo with id: " + id)

    return todoIndex
}

// With Immer
export default (state : ITodosState = initialTodoState, action : TodoActions) => produce(state, draft => 
{
    switch (action.type)
    {
        case TodoActionTypes.CREATE_TODO :
            draft.todos.push({ id : newGuid(), title : action.payload.title, completed : false })
            break

        case TodoActionTypes.UPDATE_TODO :
            getTodoOrThrowError(draft, action.payload.id).title = action.payload.newTitle
            break

        case TodoActionTypes.TOGGLE_TODO :
            let todo = getTodoOrThrowError(draft, action.payload.id)
            todo.completed = !todo.completed
            break

        case TodoActionTypes.DELETE_TODO :
            draft.todos.splice(getTodoIndexOrThrowError(draft, action.payload.id), 1)
            break

        case TodoActionTypes.UPDATE_TODO_FILTERS :
            draft.filters = action.payload
            break;
    }
})

// Without Immer
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