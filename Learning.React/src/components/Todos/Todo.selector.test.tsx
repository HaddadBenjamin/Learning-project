import { Todo } from "./Todo.model"
import { ITodosState } from "./Todo.reducer"
import { selectFilteredAndSortedTodos } from "./Todo.selector"

describe("TodoSelector", () =>
{
    describe("selectFilteredAndSortedTodos", () =>
    {
        it("Todos should be sorted by completed status", () => {
            // Arrange
            const completedTodo : Todo = { id : "2", title : "courrir 20 minutes", completed : true }
            const uncompletedTodo : Todo = { id : "1", title : "faire la vaiselle", completed : false }
            const otherTodo : Todo = { id : "3", title : "Rire plus fort", completed : true }
            const todos : Todo[] = [ uncompletedTodo, completedTodo, otherTodo ]
            const todoState : ITodosState = { todos : todos, filters :  { terms : '', onlyUncompleted : false } }

            // Act
            const filteredAndSortedTodos : Todo[] = selectFilteredAndSortedTodos(todoState)

            // Assert
            expect(filteredAndSortedTodos.length).toBe(3)
            expect(filteredAndSortedTodos[0]).toBe(uncompletedTodo)
            expect(filteredAndSortedTodos[1]).toBe(completedTodo)
            expect(filteredAndSortedTodos[2]).toBe(otherTodo)
        }),

      it("Todos should be filtered by completed status", () => {
            // Arrange
            const completedTodo : Todo = { id : "2", title : "courrir 20 minutes", completed : true }
            const uncompletedTodo : Todo = { id : "1", title : "faire la vaiselle", completed : false }
            const otherTodo : Todo = { id : "3", title : "Rire plus fort", completed : true }
            const todos : Todo[] = [ uncompletedTodo, completedTodo, otherTodo ]
            const todoState : ITodosState = { todos : todos, filters :  { terms : '', onlyUncompleted : true } }

            // Act
            const filteredAndSortedTodos : Todo[] = selectFilteredAndSortedTodos(todoState)

            // Assert
            expect(filteredAndSortedTodos.length).toBe(1)
            expect(filteredAndSortedTodos[0]).toBe(uncompletedTodo)
        }),

        it("Todos should be filtered by terms", () => {
            // Arrange
            const completedTodo : Todo = { id : "2", title : "courrir 20 minutes", completed : true }
            const uncompletedTodo : Todo = { id : "1", title : "faire la vaiselle", completed : false }
            const otherTodo : Todo = { id : "3", title : "Sauter 5 minutes", completed : true }
            const todos : Todo[] = [ uncompletedTodo, completedTodo, otherTodo ]
            const todoState : ITodosState = { todos : todos, filters :  { terms : 'minutes', onlyUncompleted : false } }

            // Act
            const filteredAndSortedTodos : Todo[] = selectFilteredAndSortedTodos(todoState)

            // Assert
            expect(filteredAndSortedTodos.length).toBe(2)
            expect(filteredAndSortedTodos[0]).toBe(completedTodo)
            expect(filteredAndSortedTodos[1]).toBe(otherTodo)
        })
    })
})