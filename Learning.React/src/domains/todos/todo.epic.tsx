import { createTodo, deleteTodo, getTodos, toggleTodo, updateTodo } from './todo.action'
import { combineEpics, Epic } from 'redux-observable'
import { map, mergeMap, filter, catchError } from 'rxjs/operators'
import { of, from } from 'rxjs'
import { ITodo } from './todo.model'
import { AxiosResponse } from 'axios'
import { IGlobalState } from '../../root.reducer'
import { selectTodoByIdOrThrow } from './todo.selector'
import * as repository from './todo.repository'
import { Action } from 'redux'
import { IEpicDependencies } from '../../root.epic'

type TodoEpic = Epic<Action<any>, Action<any>, IGlobalState, IEpicDependencies>

const getTodosEpic : TodoEpic = (action$, state$, { apis : { todos : api }}) => action$.pipe(
    filter(getTodos.started.match),
    mergeMap(({ payload }) =>
        from(api.getTodos()).pipe(
            map((todos : AxiosResponse<ITodo[]>) => getTodos.done({ params : payload, result : { todos : todos.data } })),
            catchError((error : string) => of(getTodos.failed({ params : payload, error : { errorMessage : error } }))))))

const createTodoEpic : TodoEpic = (action$, state$, { apis : { todos : api }}) => action$.pipe(
    filter(createTodo.started.match),
    mergeMap(({ payload }) => 
        from(api.createTodo(repository.createTodo(payload.title))).pipe(
            map((todo : AxiosResponse<ITodo>) => createTodo.done({ params : payload, result : { todo : todo.data } })),
            catchError((error : string) => of(createTodo.failed({ params : payload, error : { errorMessage : error } }))))))

const patchTodoTitleEpic : TodoEpic = (action$, state$, { apis : { todos : api }}) => action$.pipe(
    filter(updateTodo.started.match),
    mergeMap(({ payload }) => 
        from(api.patchTodoTitle(payload.id, payload.newTitle)).pipe(
            map((todo : AxiosResponse<ITodo>) => updateTodo.done({ params : payload, result : { todo : todo.data } })),
            catchError((error : string) => of(updateTodo.failed({ params : payload, error : { errorMessage : error } }))))))

const patchTodoCompletedEpic : TodoEpic = (action$, state$, { apis : { todos : api }}) => action$.pipe(
    filter(toggleTodo.started.match),
    mergeMap(({ payload }) => 
        from(api.patchTodoCompleted(payload.id, !selectTodoByIdOrThrow(state$.value, payload.id).completed)).pipe(
            map((todo : AxiosResponse<ITodo>) => toggleTodo.done({ params : payload, result : { todo : todo.data } })),
            catchError((error : string) => of(toggleTodo.failed({ params : payload, error : { errorMessage : error } }))))))

const deleteTodoEpic : TodoEpic = (action$, state$, { apis : { todos : api }}) => action$.pipe(
    filter(deleteTodo.started.match),
    mergeMap(({ payload }) => 
        from(api.deleteTodo(payload.id)).pipe(
            map(() => deleteTodo.done({ params : payload, result : { id : payload.id } })),
            catchError((error : string) => of(deleteTodo.failed({ params : payload, error : { errorMessage : error } }))))))

export default combineEpics(getTodosEpic, createTodoEpic, patchTodoTitleEpic, patchTodoCompletedEpic, deleteTodoEpic)