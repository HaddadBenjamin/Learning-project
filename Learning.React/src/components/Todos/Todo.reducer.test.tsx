import { ITodoFilters, Todo } from './todo.model'
import todoReducer, { initialTodoState, ITodosState } from './todo.reducer'
import { createTodo, deleteTodo, ICreatedTodoAction, ICreateTodoAction, IDeleteTodoAction, IToggleTodoAction, IUpdateTodoAction, IUpdateTodoFiltersAction, toggleTodo, updateTodo, updateTodoFilters } from './todo.action'
import { Action, Success } from 'typescript-fsa'
import { newGuid } from '../../shared/helpers/stringHelpers'

describe("TodoReducer", () =>
{
  it("CREATE_TODO should create a new todo", () => {
        // Arrange
        const initialState : ITodosState = { ...initialTodoState, todos : [] }
        const newTodoTitle : string = 'Faire les courses'
        const createdTodoAction : Action<Success<ICreateTodoAction, ICreatedTodoAction>> =
            createTodo.done(
            { 
                params : { title : newTodoTitle },
                result : { todo : { id : newGuid(), completed : false, title : newTodoTitle } }
            })

        // Act
        const newState : ITodosState = todoReducer(initialState, createdTodoAction)

        // Assert
        expect(newState.todos).toHaveLength(1)
        expect(newState.todos[0].completed).toBeFalsy()
        expect(newState.todos[0].title).toBe(newTodoTitle)
    }),

    describe("UPDATE_TODO", () => 
    {
        it("UPDATE_TODO should update an existing todo", () => {
            // Arrange
            const existingTodo : Todo = { id : '1', completed : false, title : 'Faire les courses'}
            const initialState : ITodosState = { ...initialTodoState, todos : [existingTodo] }
            const newTodoTitle : string = 'Acheter du poivre'
            const updateTodoAction : Action<IUpdateTodoAction> = updateTodo({ id : existingTodo.id, newTitle : newTodoTitle })
    
            // Act
            const newState : ITodosState = todoReducer(initialState, updateTodoAction)
    
            // Assert
            expect(newState.todos).toHaveLength(1)
            expect(newState.todos[0].completed).toBeFalsy()
            expect(newState.todos[0].title).toBe(newTodoTitle)
        }),

        it("UPDATE_TODO should not throw an excpetion when the todo don't exists", () => {
            // Arrange
            const initialState : ITodosState = { ...initialTodoState, todos : [] }
            const todoIdThatDontExists : string = '28'
            const newTodoTitle : string = 'Acheter du poivre'
            const updateTodoAction : Action<IUpdateTodoAction> = updateTodo({ id : todoIdThatDontExists, newTitle : newTodoTitle })

             // Act & Assert
             expect(() => todoReducer(initialState, updateTodoAction)).toThrow()
        })
    }),

    describe("TOGGLE_TODO", () => 
    {
        it("TOGGLE_TODO should toggle an existing todo", () => {
            // Arrange
            const existingTodo : Todo = { id : '1', completed : false, title : 'Faire les courses'}
            const initialState : ITodosState = { ...initialTodoState, todos : [existingTodo] }
            const toggleTodoAction : Action<IToggleTodoAction> = toggleTodo({ id : existingTodo.id })
    
            // Act
            const newState : ITodosState = todoReducer(initialState, toggleTodoAction)
    
            // Assert
            expect(newState.todos).toHaveLength(1)
            expect(newState.todos[0].completed).toBeTruthy()
        }),

        it("TOGGLE_TODO should not throw an excpetion when the todo don't exists", () => {
            // Arrange
            const initialState : ITodosState = { ...initialTodoState, todos : [] }
            const todoIdThatDontExists : string = '28'
            const toggleTodoAction : Action<IToggleTodoAction> = toggleTodo({ id : todoIdThatDontExists })

             // Act & Assert
             expect(() => todoReducer(initialState, toggleTodoAction)).toThrow()
        })
    }),

    describe("DELETE_TODO", () => 
    {    
        it("DELETE_TODO should delete an existing todo", () => {
            // Arrange
            const existingTodo : Todo = { id : '1', completed : false, title : 'Faire les courses'}
            const initialState : ITodosState = { ...initialTodoState, todos : [existingTodo] }
            const deleteTodoAction : Action<IToggleTodoAction> = deleteTodo({ id : existingTodo.id })

            // Act
            const newState : ITodosState = todoReducer(initialState, deleteTodoAction)

            // Assert
            expect(newState.todos).toHaveLength(0)
        }),

        it("DELETE_TODO should not throw an excpetion when the todo don't exists", () => {
            // Arrange
            const initialState : ITodosState = { ...initialTodoState, todos : [] }
            const todoIdThatDontExists : string = '28'
            const deleteTodoAction : Action<IDeleteTodoAction> = deleteTodo({ id : todoIdThatDontExists })

             // Act & Assert
             expect(() => todoReducer(initialState, deleteTodoAction)).not.toThrow()
        })
    })

    it("UPDATE_TODO_FILTERS should update to do filters", () => {
        // Arrange
        const initialState : ITodosState = { ...initialTodoState, todos : [] }
        const newTodoFilters : ITodoFilters = { onlyUncompleted : true, terms : 'courses' }
        const updateTodoFiltersAction : Action<IUpdateTodoFiltersAction> = updateTodoFilters({ filters : newTodoFilters })

        // Act
        const newState : ITodosState = todoReducer(initialState, updateTodoFiltersAction)

        // Assert
        expect(newState.todos).toHaveLength(0)
        expect(newState.filters).toEqual(newTodoFilters)
    })
})