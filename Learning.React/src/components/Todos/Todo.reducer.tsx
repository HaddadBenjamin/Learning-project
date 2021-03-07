import { TodoActionTypes, TodoActions } from './todo.action'
import { ITodoFilters, Todo } from './todo.model'
import { newGuid } from '../../shared/helpers/stringHelpers'

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

// Without Immer & Redux & API + asynchronous call
export default function todoReducer(state : ITodosState = initialTodoState, action : TodoActions) : ITodosState
{
    switch (action.type)
    {
        case TodoActionTypes.CREATE_TODO :
            return {
                ...state,
                todos : [ ...state.todos, { id : newGuid(), title : action.payload.title, completed : false } ]
            }

        case TodoActionTypes.UPDATE_TODO :
            return { 
                ...state,
                todos : state.todos.map(todo => todo.id === action.payload.id ?
                                    { ...todo, title : action.payload.newTitle } : todo)
            }

        case TodoActionTypes.TOGGLE_TODO :
            return { 
                ...state, 
                todos : state.todos.map(todo => todo.id === action.payload.id ?
                                        { ...todo, completed : !todo.completed } : todo)
            }
       
        case TodoActionTypes.DELETE_TODO :
            return { ...state, todos : state.todos.filter(todo => todo.id !== action.payload.id) }

        case TodoActionTypes.UPDATE_TODO_FILTERS :
            return { ...state, filters : { ...action.payload } }

        // Without this line, the state is undefined at first init
        default : return state
    }
}