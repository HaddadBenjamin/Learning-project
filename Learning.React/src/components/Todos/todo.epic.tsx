import { createTodo, deleteTodo, getTodos, toggleTodo, updateTodo } from './todo.action'
import { newGuid } from '../../shared/helpers/stringHelpers'
import { combineEpics, Epic, StateObservable } from 'redux-observable'
import { map, mergeMap, filter, catchError } from 'rxjs/operators'
import { of, from } from 'rxjs'
import * as api from './todo.api'
import { ITodo } from './todo.model'
import { AxiosResponse } from 'axios'
import { IGlobalState } from '../../rootReducer'

type TodoEpic = Epic<any, any, IGlobalState>

const getTodosEpic : TodoEpic = (action$) => action$.pipe(
    filter(getTodos.started.match),
    mergeMap(({ payload }) =>
        from(api.getTodos()).pipe(
            map((todos : AxiosResponse<ITodo[]>) => getTodos.done({ params : payload, result : { todos : todos.data } })),
            catchError((error : string) => of(getTodos.failed({ params : payload, error : { errorMessage : error } })))
        )
    )
)

const createTodoEpic : TodoEpic = (action$) => action$.pipe(
    filter(createTodo.started.match),
    mergeMap(({ payload }) => 
        from(api.createTodo({ id : newGuid(), title : payload.title, completed : false })).pipe(
            map((todo : AxiosResponse<ITodo>) => createTodo.done({ params : payload, result : { todo : todo.data } })),
            catchError((error : string) => of(createTodo.failed({ params : payload, error : { errorMessage : error } })))
        )
    )
)

const patchTodoTitleEpic : TodoEpic = (action$) => action$.pipe(
    filter(updateTodo.started.match),
    mergeMap(({ payload }) => 
        from(api.patchTodoTitle(payload.id, payload.newTitle)).pipe(
            map((todo : AxiosResponse<ITodo>) => updateTodo.done({ params : payload, result : { todo : todo.data } })),
            catchError((error : string) => of(updateTodo.failed({ params : payload, error : { errorMessage : error } })))
        )
    )
)

const patchTodoCompletedEpic : TodoEpic = (action$, state$ : StateObservable<IGlobalState>) => action$.pipe(
    filter(toggleTodo.started.match),
    mergeMap(({ payload }) => 
    {
        const todos : ITodo[] = state$.value.todos.todos
        const todo : ITodo | undefined = todos.find((todo : ITodo) => todo.id === payload.id)

        if (todo === undefined)
            return of(toggleTodo.failed({ params : payload, error : { errorMessage : `todo ${payload.id} do not exists` } }))

        return from(api.patchTodoCompleted(payload.id, !todo.completed)).pipe(
            map((todo : AxiosResponse<ITodo>) => toggleTodo.done({ params : payload, result : { todo : todo.data } })),
            catchError((error : string) => of(toggleTodo.failed({ params : payload, error : { errorMessage : error } })))
        )
    })
)

const deleteTodoEpic : TodoEpic = (action$) => action$.pipe(
    filter(deleteTodo.started.match),
    mergeMap(({ payload }) => 
        from(api.deleteTodo(payload.id)).pipe(
            map(() => deleteTodo.done({ params : payload, result : { id : payload.id } })),
            catchError((error : string) => of(deleteTodo.failed({ params : payload, error : { errorMessage : error } })))
        )
    )
)

export default combineEpics(getTodosEpic, createTodoEpic, patchTodoTitleEpic, patchTodoCompletedEpic, deleteTodoEpic)