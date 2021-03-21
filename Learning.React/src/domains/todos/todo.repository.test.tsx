import { ITodo } from './todo.model'
import todoRepository from './todo.repository'

it("create todo should generate a new to do with a random guid, completed to false and generate guid", () =>
{
    // Arrange
    const expectedTodoTitle : string = 'Faire les courses'

    // Act
    const todo : ITodo = new todoRepository().create(expectedTodoTitle)
    const expectedTodo : ITodo = { ...todo, title : expectedTodoTitle, completed : false }

    // Assert
    expect(todo).toEqual(expectedTodo)
})