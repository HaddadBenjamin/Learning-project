import { ITodo } from './todo.model'
import { selectFilteredAndSortedTodos, selectTodoByIdOrThrow } from './todo.selector'
import { IGlobalState, initialGlobalState } from '../../root.reducer'
import { initialTodoState } from './todo.reducer'
import { newGuid } from '../../shared/helpers/stringHelpers'

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
        const expectedTodos : ITodo[] = [uncompletedTodo, completedTodo, otherTodo]

        // Act
        const filteredAndSortedTodos : ITodo[] = selectFilteredAndSortedTodos(globalState)

        // Assert
        expect(filteredAndSortedTodos).toEqual(expectedTodos)
    }),

    it("Todos should be filtered by completed status", () =>
    {
        // Arrange
        const completedTodo : ITodo = { id : "2", title : "courrir 20 minutes", completed : true }
        const uncompletedTodo : ITodo = { id : "1", title : "faire la vaiselle", completed : false }
        const otherTodo : ITodo = { id : "3", title : "Rire plus fort", completed : true }
        const todos : ITodo[] = [ uncompletedTodo, completedTodo, otherTodo ]
        const globalState : IGlobalState = { todos : { ...initialTodoState, todos : todos, filters : { terms : '', onlyUncompleted : true } } }
        const expectedTodos : ITodo[] = [uncompletedTodo]

        // Act
        const filteredAndSortedTodos : ITodo[] = selectFilteredAndSortedTodos(globalState)

        // Assert
        expect(filteredAndSortedTodos).toEqual(expectedTodos)
    }),

    it("Todos should be filtered by terms", () =>
    {
        // Arrange
        const completedTodo : ITodo = { id : "2", title : "courrir 20 minutes", completed : true }
        const uncompletedTodo : ITodo = { id : "1", title : "faire la vaiselle", completed : false }
        const otherTodo : ITodo = { id : "3", title : "Sauter 5 minutes", completed : true }
        const todos : ITodo[] = [ uncompletedTodo, completedTodo, otherTodo ]
        const globalState : IGlobalState = { todos : { ...initialTodoState, todos : todos, filters : { terms : 'minutes', onlyUncompleted : false } } }
        const expectedTodos : ITodo[] = [completedTodo, otherTodo]

        // Act
        const filteredAndSortedTodos : ITodo[] = selectFilteredAndSortedTodos(globalState)

        // Assert
        expect(filteredAndSortedTodos).toEqual(expectedTodos)
    })
})

it("selectTodoByIdOrThrow should throw when todo do not exists", () =>
    // Act & Assert
    expect(() => selectTodoByIdOrThrow(initialGlobalState, newGuid())).toThrow())