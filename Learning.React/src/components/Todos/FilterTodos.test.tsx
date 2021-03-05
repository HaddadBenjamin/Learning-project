import { filterTodos } from './FilterTodos'
import { Todo, ITodoFilters } from './Todo.model'

describe("FilterTodos", () =>
{
  it("Todos should be filtered by terms", () => {
    // Arrange
    const completedTodo : Todo = { id : "2", title : "courrir 20 minutes", completed : true }
    const uncompletedTodo : Todo = { id : "1", title : "faire la vaiselle", completed : false }
    const otherTodo : Todo = { id : "3", title : "Sauter 5 minutes", completed : true }
    const todos : Todo[] = [ uncompletedTodo, completedTodo, otherTodo ]
    const filters : ITodoFilters = { terms : 'minutes', onlyUncompleted : false }

    // Act
    const filteredTodos : Todo[] = filterTodos(todos, filters)

    // Assert
    expect(filteredTodos.length).toBe(2)
    expect(filteredTodos[0]).toBe(completedTodo)
    expect(filteredTodos[1]).toBe(otherTodo)
  }),

  it("Todos should be filtered by completed status", () => {
    // Arrange
    const completedTodo : Todo = { id : "2", title : "courrir 20 minutes", completed : true }
    const uncompletedTodo : Todo = { id : "1", title : "faire la vaiselle", completed : false }
    const otherTodo : Todo = { id : "3", title : "Rire plus fort", completed : true }
    const todos : Todo[] = [ uncompletedTodo, completedTodo, otherTodo ]
    const filters : ITodoFilters = { terms : '', onlyUncompleted : true }

    // Act
    const filteredTodos : Todo[] = filterTodos(todos, filters)

    // Assert
    expect(filteredTodos.length).toBe(1)
    expect(filteredTodos[0]).toBe(uncompletedTodo)
  })
})