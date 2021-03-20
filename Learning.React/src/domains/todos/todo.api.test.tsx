import { ITodo } from './todo.model'
import request from 'supertest'
import todoRepository from './todo.repository'
import JsonTestServer, { IJsonTestServer } from '../../shared/utilities/jsonTestServer'

let jsonTestServer : IJsonTestServer

describe("todo.api", () =>
{
    beforeAll(() => jsonTestServer = new JsonTestServer(5555))
    afterAll(() => jsonTestServer.clean())

    it("POST /todos should respond with a http status 200 and return the todo", done =>
    {
        // Arrange
        const expectedTodo : ITodo = new todoRepository().create('Faire les courses')

        request(jsonTestServer.server)
            // Act
            .post('/todos')
            .send(expectedTodo)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            // Assert
            .expect(201)
            .end(function (err, res)
            {
                expect(err).toBeNull()
                expect(res.body).toEqual(expectedTodo)

                done()
            })
    })
})