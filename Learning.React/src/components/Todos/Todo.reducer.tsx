import { newGuid } from "../../shared/helpers/StringHelpers"
import { TodoActionTypes, TodoActions } from "./Todo.action"
import { ITodoFilters, Todo } from "./Todo.model"

export interface ITodosState
{
    todos : Todo[]
    filters : ITodoFilters
}

export const initialState : ITodosState =
{
    todos : [
        { id : newGuid(), title : "Faire le lit", completed : false },
        { id : newGuid(), title : "Ranger le lave vaiselle", completed : false }
    ],
    filters :
    {
        terms : '',
        onlyUncompleted : true
    }
}

// Without Immer & Redux & API + asynchronous call
export default function todoReducer(state : ITodosState = initialState, action : TodoActions) : ITodosState
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
    }
}