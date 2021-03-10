import { ITodo } from './todo.model'
import axios, { AxiosPromise, AxiosRequestConfig } from 'axios'

// should be stored in a config file + change depending the environment
const api = 'http://localhost:3001/todos'

const configuration : AxiosRequestConfig = { headers : { 'Content-Type' : 'application/json' } }

export const getTodos = () : AxiosPromise<ITodo[]> => axios.get(api, configuration)

export const createTodo = (todo : ITodo) : AxiosPromise<ITodo> => axios.post(api, todo, configuration)

export const patchTodoTitle = (id : string, title : string) : AxiosPromise<ITodo> => 
    axios.patch(`${api}/${id}`, { title : title }, configuration)

export const patchTodoCompleted = (id : string, completed : boolean) : AxiosPromise<ITodo> => 
    axios.patch(`${api}/${id}`, { completed : completed }, configuration)

export const deleteTodo = (id : string)  : AxiosPromise => axios.delete(`${api}/${id}`, configuration)