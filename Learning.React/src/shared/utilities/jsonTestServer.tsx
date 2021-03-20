import jsonServer, { MiddlewaresOptions } from 'json-server'
import { Application } from 'express'
import fs from 'fs'
import { ITodo } from '../../domains/todos/todo.model'
import { execAsync } from '../helpers/jsHelpers'

export interface IJsonTestServer
{
    readonly port : number
    readonly server : Application

    init() : void
    request(callback : () => void) : void
    clean() : Promise<string>
}

export default class JsonTestServer implements IJsonTestServer
{
    readonly port : number
    readonly server : Application

    constructor (port : number = 18921)
    {
        this.port = port
        this.server = jsonServer.create()  
    }

    init() : void
    {
        const todo : ITodo = { id : '1', title : 'Première todo dinitialisation', completed : false }

        fs.writeFileSync(
            './testApi.json',
            JSON.stringify({ todos : [todo] })) 

        const router = jsonServer.router('testApi.json')
        const middlewareOptions : MiddlewaresOptions = { noCors : true }
        const middlewares = jsonServer.defaults(middlewareOptions)

        this.server.use(middlewares)
        this.server.use(router)
    }

    request(callback : () => void) : void
    {
        this.clean().then((value) =>
        {
            this.init()
            this.server.listen(this.port, () => callback())
        })
        
    }

    clean() : Promise<string> { return execAsync(`npx kill-port ${this.port}`) }
}