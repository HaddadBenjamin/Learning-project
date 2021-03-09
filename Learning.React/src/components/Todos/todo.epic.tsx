import { createTodo } from './todo.action'
import { newGuid } from '../../shared/helpers/stringHelpers'
import { combineEpics, Epic } from 'redux-observable'
import { map, filter, delay } from 'rxjs/operators'
import { of } from 'rxjs'

const createTodoEpic : Epic = (action$, state$) => action$.pipe(
    filter(createTodo.started.match),
    delay(50),
    map(({ payload }) =>
    {
        try
        {
            return createTodo.done(
            { 
                params : payload,
                result : { todo :  { id : newGuid(), title : payload.title, completed : false } }
            }) 
        }
        catch (error)
        {
            return of(createTodo.failed(
            {
                params : payload,
                error : { errorMessage : error }
            }))
        }
    })
)

export default combineEpics(createTodoEpic)