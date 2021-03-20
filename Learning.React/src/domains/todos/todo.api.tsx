import { ITodo } from './todo.model'
import axios, { AxiosPromise, AxiosRequestConfig } from 'axios'

export interface ITodoApi
{
    readonly api : string
    readonly configuration : AxiosRequestConfig
    
    getAll() : AxiosPromise<ITodo[]> 
    create(todo : ITodo) : AxiosPromise<ITodo>
    patchTitle(id : string, title : string) : AxiosPromise<ITodo>
    patchCompleted(id : string, completed : boolean) : AxiosPromise<ITodo>
    delete(id : string) : AxiosPromise
}

export default class TodoApi implements ITodoApi
{
    // should be stored in a config file + change depending the environment
    readonly api : string = 'http://localhost:3001/todos'
    readonly configuration : AxiosRequestConfig = { headers : { 'Content-Type' : 'application/json' } }
    
    getAll = () : AxiosPromise<ITodo[]> => axios.get(this.api, this.configuration)

    create = (todo : ITodo) : AxiosPromise<ITodo> => axios.post(this.api, todo, this.configuration)

    patchTitle = (id : string, title : string) : AxiosPromise<ITodo> => 
        axios.patch(`${this.api}/${id}`, { title : title }, this.configuration)

    patchCompleted = (id : string, completed : boolean) : AxiosPromise<ITodo> => 
        axios.patch(`${this.api}/${id}`, { completed : completed }, this.configuration)

    delete = (id : string)  : AxiosPromise => axios.delete(`${this.api}/${id}`, this.configuration)
}