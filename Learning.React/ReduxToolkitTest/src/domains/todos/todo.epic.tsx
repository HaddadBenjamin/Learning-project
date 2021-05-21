import { createTodo, deleteTodo, getTodos, toggleTodo, updateTodo } from './todo.action'
import { combineEpics, Epic } from 'redux-observable'
import { map, mergeMap, filter, catchError } from 'rxjs/operators'
import { of, from } from 'rxjs'
import { ITodo } from './todo.model'
import { AxiosResponse } from 'axios'
import { IGlobalState } from '../../root.reducer'
import { selectTodoByIdOrThrow } from './todo.selector'
import { Action } from 'redux'
import { IEpicDependencies } from '../../root.epic'

type TodoEpic = Epic<Action<any>, Action<any>, IGlobalState, IEpicDependencies>

export const getTodosEpic : TodoEpic = (action$, state$, { apis : { todo : api }}) => action$.pipe(
    filter(getTodos.started.match),
    mergeMap(({ payload }) =>
        from(api.getAll()).pipe(
            map((todos : AxiosResponse<ITodo[]>) => getTodos.done({ params : payload, result : { todos : todos.data } })),
            catchError((error : string) => of(getTodos.failed({ params : payload, error : { errorMessage : error } }))))))

export const createTodoEpic : TodoEpic = (action$, state$, { apis : { todo : api }, repositories : { todo : repository }}) => action$.pipe(
    filter(createTodo.started.match),
    mergeMap(({ payload }) => 
        from(api.create(repository.create(payload.title))).pipe(
            map((todo : AxiosResponse<ITodo>) => createTodo.done({ params : payload, result : { todo : todo.data } })),
            catchError((error : string) => of(createTodo.failed({ params : payload, error : { errorMessage : error } }))))))

export const patchTodoTitleEpic : TodoEpic = (action$, state$, { apis : { todo : api }}) => action$.pipe(
    filter(updateTodo.started.match),
    mergeMap(({ payload }) => 
        from(api.patchTitle(payload.id, payload.newTitle)).pipe(
            map((todo : AxiosResponse<ITodo>) => updateTodo.done({ params : payload, result : { todo : todo.data } })),
            catchError((error : string) => of(updateTodo.failed({ params : payload, error : { errorMessage : error } }))))))

export const patchTodoCompletedEpic : TodoEpic = (action$, state$, { apis : { todo : api }}) => action$.pipe(
    filter(toggleTodo.started.match),
    mergeMap(({ payload }) => 
        from(api.patchCompleted(payload.id, !selectTodoByIdOrThrow(state$.value, payload.id).completed)).pipe(
            map((todo : AxiosResponse<ITodo>) => toggleTodo.done({ params : payload, result : { todo : todo.data } })),
            catchError((error : string) => of(toggleTodo.failed({ params : payload, error : { errorMessage : error } }))))))

export const deleteTodoEpic : TodoEpic = (action$, state$, { apis : { todo : api }}) => action$.pipe(
    filter(deleteTodo.started.match),
    mergeMap(({ payload }) => 
        from(api.delete(payload.id)).pipe(
            map(() => deleteTodo.done({ params : payload, result : { id : payload.id } })),
            catchError((error : string) => of(deleteTodo.failed({ params : payload, error : { errorMessage : error } }))))))

export default combineEpics(getTodosEpic, createTodoEpic, patchTodoTitleEpic, patchTodoCompletedEpic, deleteTodoEpic)