import { sortTodos } from './sortTodos'
import { ITodo } from './todo.model'

describe("SortTodos", () =>
{
  it("Todos should be sorted by completed status", () =>
    {
      // Arrange
      const completedTodo : ITodo = { id : "2", title : "courrir 20 minutes", completed : true }
      const uncompletedTodo : ITodo = { id : "1", title : "faire la vaiselle", completed : false }
      const todos : ITodo[] = [ uncompletedTodo, completedTodo ];

      // Act
      const sortedTodos : ITodo[] = sortTodos(todos)

      // Assert
      expect(sortedTodos).toHaveLength(2)
      expect(sortedTodos[0]).toBe(uncompletedTodo)
      expect(sortedTodos[1]).toBe(completedTodo)
    })
})