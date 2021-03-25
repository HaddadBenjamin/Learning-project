import { ITodo } from './todo.model'
import axios, { AxiosResponse, AxiosRequestConfig } from 'axios'

export interface ITodoApi
{
    readonly url : string
    readonly configuration : AxiosRequestConfig
    
    getAll() : Promise<AxiosResponse<ITodo[]>> 
    create(todo : ITodo) : Promise<AxiosResponse<ITodo>>
    patchTitle(id : string, title : string) : Promise<AxiosResponse<ITodo>>
    patchCompleted(id : string, completed : boolean) : Promise<AxiosResponse<ITodo>>
    delete(id : string) : Promise<AxiosResponse<ITodo>>
}

export default class TodoApi implements ITodoApi
{
    // should be stored in a config file + change depending the environment
    readonly url : string = 'http://localhost:3001/todos'
    readonly configuration : AxiosRequestConfig = { headers : { 'Content-Type' : 'application/json' } }
    
    getAll = () : Promise<AxiosResponse<ITodo[]>> => axios.get(this.url, this.configuration)

    create = (todo : ITodo) : Promise<AxiosResponse<ITodo>> => axios.post(this.url, todo, this.configuration)

    patchTitle = (id : string, title : string) : Promise<AxiosResponse<ITodo>> => 
        axios.patch(`${this.url}/${id}`, { title : title }, this.configuration)

    patchCompleted = (id : string, completed : boolean) : Promise<AxiosResponse<ITodo>> => 
        axios.patch(`${this.url}/${id}`, { completed : completed }, this.configuration)

    delete = (id : string) : Promise<AxiosResponse<ITodo>> => axios.delete(`${this.url}/${id}`, this.configuration)
}