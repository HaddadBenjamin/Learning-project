import jsonServer, { MiddlewaresOptions } from 'json-server'
import { exec } from 'child_process'
import { Application } from 'express'
import fs from 'fs'
import { ITodo } from '../../domains/todos/todo.model'

export interface IJsonTestServer
{
    readonly port : number
    readonly server : Application
    
    clean() : void
}

export default class JsonTestServer implements IJsonTestServer
{
    readonly port : number
    readonly server : Application

    constructor (port : number = 18921)
    {
        this.port = port
        this.server = jsonServer.create()
        
        const todo : ITodo = { id : '1', title : 'Première todo dinitialisation', completed : false }

        fs.writeFileSync(
            './testApi.json',
            JSON.stringify({ todos : [todo] })) 

        const router = jsonServer.router('testApi.json')
        const middlewareOptions : MiddlewaresOptions = { noCors : true }
        const middlewares = jsonServer.defaults(middlewareOptions)

        this.server.use(middlewares)
        this.server.use(router)
        
        this.server.listen(port, () => {})
    }

    clean() : void
    {
        exec(`npx kill-port ${this.port}`) 
    }
}