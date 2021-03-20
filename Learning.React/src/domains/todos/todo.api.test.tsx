import { ITodo } from './todo.model'
import request from 'supertest'
import todoRepository from './todo.repository'
import JsonTestServer, { IJsonTestServer } from '../../shared/utilities/jsonTestServer'

let jsonTestServer : IJsonTestServer

describe("todo.api", () =>
{
    beforeAll(() => jsonTestServer = new JsonTestServer(5556))
    afterAll(() => jsonTestServer.clean())

    it("GET /todos should respond with a http status 200 and return all the todos", done =>
            request(jsonTestServer.server)
                // Act
                .get('/todos')
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')
                // Assert
                .expect(200)
                .end(function (err, res)
                {
                    expect(err).toBeNull()
                    expect(res.body.length).not.toBeLessThan(1)

                    done()
             }))

    it("POST /todos should respond with a http status 201 and return the todo", done =>
    {
        // Arrange
        const expectedTodo : ITodo = { ...new todoRepository().create('Faire les courses'), id : '2' }

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

    it("PATCH /todos title by id should respond with a http status 200 and update the title", done =>
    {
        // Arrange
        const expectedTodo : ITodo = { id : '1', title : 'Faire des frites et du fromage', completed : false }
     
        request(jsonTestServer.server)
            // Act
            .patch('/todos/1')
            .send({ title : expectedTodo.title })
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            // Assert
            .expect(200)
            .end(function (err, res)
            {
                expect(err).toBeNull()
                expect(res.body).toEqual(expectedTodo)

                done()
            })
    })

    it("PATCH /todos completed by id should respond with a http status 200 and update the completed status", done =>
        request(jsonTestServer.server)
            // Act
            .patch('/todos/1')
            .send({ completed : true })
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            // Assert
            .expect(200)
            .end(function (err, res)
            {
                expect(err).toBeNull()
                expect(res.body).toEqual({ id : '1', title : res.body.title, completed : true })

                done()
            }))

    it("DELETE /todos by id should respond with a http status 200", done =>
        request(jsonTestServer.server)
            // Act
            .delete('/todos/1')
            .send({ completed : true })
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            // Assert
            .expect(200)
            .end(function (err, res)
            {
                expect(err).toBeNull()
                done()
            }))
})