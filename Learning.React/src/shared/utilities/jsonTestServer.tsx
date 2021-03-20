import jsonServer, { MiddlewaresOptions } from 'json-server'
import { Application } from 'express'
import fs from 'fs'
import { ITodo } from '../../domains/todos/todo.model'
import { execAsync } from '../helpers/jsHelpers'

export interface ISingleRequestJsonTestServer
{
    init() : void
    clean() : Promise<string>
}

export default class SingleRequestJsonTestServer implements ISingleRequestJsonTestServer
{
    port : number = 18921
    server : Application | null = null

    constructor (port : number = 18921, callback : (server : Application) => void)
    {
        this.port = port
        
        this.clean().then((value) =>
        {
            this.server = jsonServer.create()

            this.init()
            this.server.listen(this.port, () => callback(this.server as Application))
        })
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

        this.server?.use(middlewares)
        this.server?.use(router)
    }

    clean() : Promise<string> { return execAsync(`npx kill-port ${this.port}`) }
}