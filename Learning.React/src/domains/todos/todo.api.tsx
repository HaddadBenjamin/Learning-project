import { ITodo } from './todo.model'
import axios, { AxiosPromise, AxiosRequestConfig } from 'axios'

export interface ITodoApi
{
    readonly api : string
    readonly configuration : AxiosRequestConfig
    
    getTodos() : AxiosPromise<ITodo[]> 
    createTodo(todo : ITodo) : AxiosPromise<ITodo>
    patchTodoTitle(id : string, title : string) : AxiosPromise<ITodo>
    patchTodoCompleted(id : string, completed : boolean) : AxiosPromise<ITodo>
    deleteTodo(id : string) : AxiosPromise
}

export default class TodoApi implements ITodoApi
{
    // should be stored in a config file + change depending the environment
    readonly api : string = 'http://localhost:3001/todos'
    readonly configuration : AxiosRequestConfig = { headers : { 'Content-Type' : 'application/json' } }
    
    getTodos = () : AxiosPromise<ITodo[]> => axios.get(this.api, this.configuration)

    createTodo = (todo : ITodo) : AxiosPromise<ITodo> => axios.post(this.api, todo, this.configuration)

    patchTodoTitle = (id : string, title : string) : AxiosPromise<ITodo> => 
        axios.patch(`${this.api}/${id}`, { title : title }, this.configuration)

    patchTodoCompleted = (id : string, completed : boolean) : AxiosPromise<ITodo> => 
        axios.patch(`${this.api}/${id}`, { completed : completed }, this.configuration)

    deleteTodo = (id : string)  : AxiosPromise => axios.delete(`${this.api}/${id}`, this.configuration)
}