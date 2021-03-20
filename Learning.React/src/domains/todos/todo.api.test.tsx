import { ITodo } from './todo.model'
import request from 'supertest'
import todoRepository from './todo.repository'
import SingleRequestJsonTestServer, { ISingleRequestJsonTestServer } from '../../shared/utilities/jsonTestServer'

it("GET /todos should respond with a http status 200 and return all the todos", done =>
    // Arrange
    new SingleRequestJsonTestServer(5567, (server) => request(server)
        // Act
        .get('/todos')
        // Assert
        .expect(200)
        .end(function (error, response)
        {
            expect(error).toBeNull()
            expect(response.body.length).not.toBeLessThan(1)

            done()
        })))

it("POST /todos should respond with a http status 201 and return the todo", done =>
{
    // Arrange
    const expectedTodo : ITodo = { ...new todoRepository().create('Faire les courses'), id : '2' }

    new SingleRequestJsonTestServer(5569, (server) => request(server)
        // Act
        .post('/todos')
        .send(expectedTodo)
        // Assert
        .expect(201)
        .end(function (error, response)
        {
            expect(error).toBeNull()
            expect(response.body).toEqual(expectedTodo)

            done()
        }))
})

it("PATCH /todos title by id should respond with a http status 200 and update the title", done =>
{
    // Arrange
    const expectedTodo : ITodo = { id : '1', title : 'Faire des frites et du fromage', completed : false }

    new SingleRequestJsonTestServer(5570, (server) => request(server)
        // Act
        .patch('/todos/1')
        .send({ title : expectedTodo.title })
        // Assert
        .expect(200)
        .end(function (error, response)
        {
            expect(error).toBeNull()
            expect(response.body).toEqual(expectedTodo)

            done()
        }))
})

it("PATCH /todos completed by id should respond with a http status 200 and update the completed status", done =>
    // Arrange
    new SingleRequestJsonTestServer(5571, (server) => request(server)
        // Act
        .patch('/todos/1')
        .send({ completed : true })
        // Assert
        .expect(200)
        .end(function (error, response)
        {
            expect(error).toBeNull()
            expect(response.body).toEqual({ id : '1', title : response.body.title, completed : true })

            done()
        })))

it("DELETE /todos by id should respond with a http status 200", done =>
    // Arrange
    new SingleRequestJsonTestServer(5572, (server) => request(server)
        // Act
        .delete('/todos/1')
        .send({ completed : true })
        // Assert
        .expect(200)
        .end(function (error, response)
        {
            expect(error).toBeNull()
            done()
        })))