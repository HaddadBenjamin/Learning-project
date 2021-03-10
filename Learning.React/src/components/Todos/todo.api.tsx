import { ITodo } from './todo.model'
import axios, { AxiosPromise } from 'axios'

// should be stored in a config file + change depending the environment
const api = 'localhost:3001/todos'

export const getTodos = () : AxiosPromise<ITodo[]> => axios.get(api)

export const createTodo = (todo : ITodo) : AxiosPromise<ITodo> => axios.post(api, JSON.stringify(todo))

export const patchTodoTitle = (id : string, title : string) : AxiosPromise<ITodo> => 
    axios.patch(`${api}/${id}`, JSON.stringify({ title : title }))

export const patchTodoCompleted = (id : string, completed : boolean) : AxiosPromise<ITodo> => 
    axios.patch(`${api}/${id}`, JSON.stringify({ completed : completed }))

export const deleteTodo = (id : string)  : AxiosPromise => axios.delete(`${api}/${id}`)