import { ITodo } from './todo.model'
import jsonServer, { MiddlewaresOptions } from 'json-server'
import request from 'supertest'
import todoRepository from './todo.repository'
import { exec } from 'child_process'

it("POST /todos should respond with a http status 200 and return the todo", done =>
{
    // Mettre tout ce code dans init
    const server = jsonServer.create()
    const router = jsonServer.router('testApi.json')
    const middlewareOptions : MiddlewaresOptions = { noCors : true }
    const middlewares = jsonServer.defaults(middlewareOptions)

    server.use(middlewares)
    server.use(router)

    const expectedTodo : ITodo = new todoRepository().create('Faire les courses')
    const port : number = 18920

    server.listen(port, () =>
        request(server)
            .post('/todos')
            .send(expectedTodo)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .expect(201)
            .end(function (err, res)
            {
                expect(err).toBeNull()
                expect(res.body).toEqual(expectedTodo)

                done();
            }))

    // Mettre ce code dans un clean
    exec(`npx kill-port ${port}`)
})