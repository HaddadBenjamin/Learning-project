import { ITodo } from './todo.model'
import supertest from 'supertest'
import todoRepository from './todo.repository'
import singleRequestJsonTestServer from '../../shared/utilities/singleRequestJsonTestServer'

it("GET /todos should respond with a http status 200 and return all the todos", done =>
{
    try
    {
        // Arrange
        new singleRequestJsonTestServer(5567, (server) => supertest(server)
            // Act
            .get('/todos')
            // Assert
            .expect(200)
            .end(function (error, response)
            {
                expect(error).toBeNull()
                expect(response.body.length).not.toBeLessThan(1)

                done()
            }))
    }
    catch (error) { done(error) }
})

it("POST /todos should respond with a http status 201 and return the todo", done =>
{
    try
    {
        // Arrange
        const expectedTodo : ITodo = { ...new todoRepository().create('Faire les courses'), id : '2' }

        new singleRequestJsonTestServer(5569, (server) => supertest(server)
            // Act
            .post('/todos')
            .send(expectedTodo)
            // Assert
            .expect(201)
            .end(function(error, response)
            {
                expect(error).toBeNull()
                expect(response.body).toEqual(expectedTodo)

                done()
            }))
    }
    catch (error) { done(error) }
})

it("PATCH /todos title by id should respond with a http status 200 and update the title", done =>
{
    try
    {
        // Arrange
        const expectedTodo : ITodo = { id : '1', title : 'Faire des frites et du fromage', completed : false }

        new singleRequestJsonTestServer(5570, (server) => supertest(server)
            // Act
            .patch('/todos/1')
            .send({ title : expectedTodo.title })
            // Assert
            .expect(200)
            .end(function(error, response)
            {
                expect(error).toBeNull()
                expect(response.body).toEqual(expectedTodo)

                done()
            }))
    }
    catch (error) { done(error) }
})

it("PATCH /todos completed by id should respond with a http status 200 and update the completed status", done =>
{
    try
    {
        // Arrange
        new singleRequestJsonTestServer(5571, (server) => supertest(server)
            // Act
            .patch('/todos/1')
            .send({ completed: true })
            // Assert
            .expect(200)
            .end(function (error, response)
            {
                expect(error).toBeNull()
                expect(response.body).toEqual({ id: '1', title: response.body.title, completed: true })

                done()
            }))
    }
    catch (error) { done(error) }
})

it("DELETE /todos by id should respond with a http status 200", done =>
{
    try
    {
        // Arrange
        new singleRequestJsonTestServer(5572, (server) => supertest(server)
            // Act
            .delete('/todos/1')
            // Assert
            .expect(200)
            .end(function (error, response)
            {
                expect(error).toBeNull()
                done()
            }))
    }
    catch (error) { done(error) }
})