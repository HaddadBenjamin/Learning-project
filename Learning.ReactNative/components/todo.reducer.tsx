import ITodo from './todo.model'
import { TodoActions, TodosAction } from './todo.action'
import { newGuid } from '../shared/stringHelper'

export interface ITodosState { todos : ITodo[] }

export const initialTodoState : ITodosState =
{
    todos : [
        { title : 'Faire les courses', completed : false, bookmarked : false, id : '1', subTasks : [], note : '' },
        { title : 'Faire à manger', completed : false, bookmarked : true, id : '2', subTasks : [], note : '' },
        { title : 'Faire la cuisine', completed : false, bookmarked : false, id : '3', subTasks : [], note : '' },
        { title : 'Laver ma chambre', completed : true, bookmarked : false, id : '4', subTasks : [], note : '' },
    ]
}
    
export default function todoReducer(state : ITodosState = initialTodoState, action : TodosAction) : ITodosState
{   
    switch (action.type)
    {
        case TodoActions.CREATE_TODO :
            return {
                ...state,
                todos : [ ...state.todos, { title : action.payload.title, completed : false, bookmarked : false, id : newGuid(), subTasks : [], note : '' } ]
            }

        // case TodoActionTypes.UPDATE_TODO :
        //     return { 
        //         ...state,
        //         todos : state.todos.map(todo => todo.id === action.payload.id ?
        //                             { ...todo, title : action.payload.newTitle } : todo)
        //     }

        case TodoActions.TOGGLE_TODO :
            return { 
                ...state, 
                todos : state.todos.map(todo => todo.id === action.payload.id ?
                                        { ...todo, completed : !todo.completed } : todo)
            }
    
        case TodoActions.BOOKMARK_TODO :
                return { 
                    ...state, 
                    todos : state.todos.map(todo => todo.id === action.payload.id ?
                                            { ...todo, bookmarked : !todo.bookmarked } : todo)
                }

        // Without this line, the state is undefined at first init
        default : return state
    }
}