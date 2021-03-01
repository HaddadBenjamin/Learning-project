import cuid from "cuid"
import Todo from "./Todo"
import { TodoActionTypes, TodoActions } from "./Todo.action"
import ITodoFilters from "./TodoFilters"

export interface ITodosState
{
    todos : Todo[],
    filters : ITodoFilters
}

const initialState : ITodosState =
{
    todos : [
        { id : cuid(), title : "Faire le lit", completed : false },
        { id : cuid(), title : "Ranger le lave vaiselle", completed : false }
    ],
    filters :
    {
        terms : '',
        onlyCompleted : false
    }
}

// Without Immer & Redux & API
export default function todoReducer(state : ITodosState = initialState, action : TodoActions) : ITodosState
{
    switch (action.type)
    {
        case TodoActionTypes.CREATE_TODO :
            return {
                ...state,
                todos : [ ...state.todos, { id : cuid(), title : action.payload.title, completed : false } ]
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