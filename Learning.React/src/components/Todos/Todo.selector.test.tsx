import { ITodo } from './todo.model'
import { selectFilteredAndSortedTodos } from './todo.selector'
import { IGlobalState } from '../../rootReducer'
import { initialTodoState } from './todo.reducer'

describe("TodoSelector", () =>
{
    describe("selectFilteredAndSortedTodos", () =>
    {
        it("Todos should be sorted by completed status", () =>
        {
            // Arrange
            const completedTodo : ITodo = { id : "2", title : "courrir 20 minutes", completed : true }
            const uncompletedTodo : ITodo = { id : "1", title : "faire la vaiselle", completed : false }
            const otherTodo : ITodo = { id : "3", title : "Rire plus fort", completed : true }
            const todos : ITodo[] = [ uncompletedTodo, completedTodo, otherTodo ]
            const globalState : IGlobalState = { todos : { ...initialTodoState, todos : todos, filters : { terms : '', onlyUncompleted : false } } }

            // Act
            const filteredAndSortedTodos : ITodo[] = selectFilteredAndSortedTodos(globalState)

            // Assert
            expect(filteredAndSortedTodos.length).toBe(3)
            expect(filteredAndSortedTodos[0]).toBe(uncompletedTodo)
            expect(filteredAndSortedTodos[1]).toBe(completedTodo)
            expect(filteredAndSortedTodos[2]).toBe(otherTodo)
        }),

      it("Todos should be filtered by completed status", () =>
      {
            // Arrange
            const completedTodo : ITodo = { id : "2", title : "courrir 20 minutes", completed : true }
            const uncompletedTodo : ITodo = { id : "1", title : "faire la vaiselle", completed : false }
            const otherTodo : ITodo = { id : "3", title : "Rire plus fort", completed : true }
            const todos : ITodo[] = [ uncompletedTodo, completedTodo, otherTodo ]
            const globalState : IGlobalState = { todos : { ...initialTodoState, todos : todos, filters : { terms : '', onlyUncompleted : true } } }

            // Act
            const filteredAndSortedTodos : ITodo[] = selectFilteredAndSortedTodos(globalState)

            // Assert
            expect(filteredAndSortedTodos.length).toBe(1)
            expect(filteredAndSortedTodos[0]).toBe(uncompletedTodo)
        }),

        it("Todos should be filtered by terms", () =>
        {
            // Arrange
            const completedTodo : ITodo = { id : "2", title : "courrir 20 minutes", completed : true }
            const uncompletedTodo : ITodo = { id : "1", title : "faire la vaiselle", completed : false }
            const otherTodo : ITodo = { id : "3", title : "Sauter 5 minutes", completed : true }
            const todos : ITodo[] = [ uncompletedTodo, completedTodo, otherTodo ]
            const globalState : IGlobalState = { todos : { ...initialTodoState, todos : todos, filters : { terms : 'minutes', onlyUncompleted : false } } }

            // Act
            const filteredAndSortedTodos : ITodo[] = selectFilteredAndSortedTodos(globalState)

            // Assert
            expect(filteredAndSortedTodos.length).toBe(2)
            expect(filteredAndSortedTodos[0]).toBe(completedTodo)
            expect(filteredAndSortedTodos[1]).toBe(otherTodo)
        })
    })
})