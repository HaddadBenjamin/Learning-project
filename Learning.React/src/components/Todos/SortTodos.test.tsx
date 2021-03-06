import { sortTodos } from './SortTodos'
import { Todo } from './Todo.model'

describe("SortTodos", () =>
{
  it("Todos should be sorted by completed status", () => {
    // Arrange
    const completedTodo : Todo = { id : "2", title : "courrir 20 minutes", completed : true }
    const uncompletedTodo : Todo = { id : "1", title : "faire la vaiselle", completed : false }
    const todos : Todo[] = [ uncompletedTodo, completedTodo ];

    // Act
    const sortedTodos : Todo[] = sortTodos(todos)

    // Assert
    expect(sortedTodos).toHaveLength(2)
    expect(sortedTodos[0]).toBe(uncompletedTodo)
    expect(sortedTodos[1]).toBe(completedTodo)
  })
})