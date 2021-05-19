import jsonServer, { MiddlewaresOptions } from 'json-server'
import { Application } from 'express'
import fs from 'fs'
import { ITodo } from '../../domains/todos/todo.model'
import { execAsync } from '../helpers/jsHelpers'

export interface ISingleRequestJsonTestServer
{
    initialize() : void
    clean() : Promise<string>
}

export default class singleRequestJsonTestServer implements ISingleRequestJsonTestServer
{
    port : number = 18921
    server : Application | null = null

    constructor (port : number = 18921, callback : (server : Application) => void)
    {
        this.port = port

        // Cette ligne prend 0.5 seconde pour chaque tests, c'est sale.
        this.clean().then((value) =>
        {
            this.server = jsonServer.create()

            this.initialize()
            this.server.listen(this.port, () => callback(this.server as Application))
        })
    }

    initialize() : void
    {
        const todo : ITodo = { id : '1', title : 'Première todo dinitialisation', completed : false }

        fs.writeFileSync('./testApi.json', JSON.stringify({ todos : [todo] })) 

        const router = jsonServer.router('testApi.json')
        const middlewaresOptions : MiddlewaresOptions = { noCors : true }
        const middlewares = jsonServer.defaults(middlewaresOptions)

        this.server?.use(middlewares)
        this.server?.use(router)
    }

    clean() : Promise<string> { return execAsync(`npx kill-port ${this.port}`) }
}