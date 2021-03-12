import { filterTodos } from './filterTodos'
import { ITodo, ITodoFilters } from './todo.model'

it("Todos should be filtered by terms", () =>
{
    // Arrange
    const completedTodo : ITodo = { id : "2", title : "courrir 20 minutes", completed : true }
    const uncompletedTodo : ITodo = { id : "1", title : "faire la vaiselle", completed : false }
    const otherTodo : ITodo = { id : "3", title : "Sauter 5 minutes", completed : true }
    const todos : ITodo[] = [ uncompletedTodo, completedTodo, otherTodo ]
    const filters : ITodoFilters = { terms : 'minutes', onlyUncompleted : false }
    const expectedTodos : ITodo[] = [completedTodo, otherTodo]

    // Act
    const filteredTodos : ITodo[] = filterTodos(todos, filters)

    // Assert
    expect(filteredTodos).toEqual(expectedTodos)
})

it("Todos should be filtered by completed status", () =>
{
    // Arrange
    const completedTodo : ITodo = { id : "2", title : "courrir 20 minutes", completed : true }
    const uncompletedTodo : ITodo = { id : "1", title : "faire la vaiselle", completed : false }
    const otherTodo : ITodo = { id : "3", title : "Rire plus fort", completed : true }
    const todos : ITodo[] = [ uncompletedTodo, completedTodo, otherTodo ]
    const filters : ITodoFilters = { terms : '', onlyUncompleted : true }
    const expectedTodos : ITodo[] = [uncompletedTodo]

    // Act
    const filteredTodos : ITodo[] = filterTodos(todos, filters)

    // Assert
    expect(filteredTodos).toEqual(expectedTodos)
})