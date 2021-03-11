import { ITodoFilters, ITodo } from './todo.model'
import todoReducer, { initialTodoState, ITodosState } from './todo.reducer'
import { createTodo, deleteTodo, ICreatedTodoAction, ICreateTodoAction, ICreateTodoFailedAction, IDeleteTodoAction, IToggleTodoAction, IUpdateTodoAction, IUpdateTodoFiltersAction, toggleTodo, updateTodo, updateTodoFilters } from './todo.action'
import { Action, Failure, Success } from 'typescript-fsa'
import { newGuid } from '../../shared/helpers/stringHelpers'
import ActionStatus from '../../shared/models/actionStatus'

describe("TodoReducer", () =>
{
    describe('CREATE_TODO', () => 
    {
        it("Started action should define create action", () =>
        {
            // Arrange
            const createTodoAction : Action<ICreateTodoAction> = createTodo.started({ title : 'Faire les courses' })

            // Act
            const { createAction : { status, errorMessage }} : ITodosState = todoReducer(initialTodoState, createTodoAction)
            
            // Assert
            expect(status).toBe(ActionStatus.Loading)
            expect(errorMessage).toBeNull()
        })

        it("Done action should create a new todo", () =>
        {
            // Arrange
            const initialState : ITodosState = { ...initialTodoState, todos : [] }
            const newTodoTitle : string = 'Faire les courses'
            const createdTodoAction : Action<Success<ICreateTodoAction, ICreatedTodoAction>> = createTodo.done(
            { 
                params : { title : newTodoTitle },
                result : { todo : { id : newGuid(), completed : false, title : newTodoTitle } }
            })
    
            // Act
            const { todos, createAction : { status }} : ITodosState = todoReducer(initialState, createdTodoAction)
            const todo : ITodo = todos[0]

            // Assert
            expect(todos).toHaveLength(1)
            expect(todo.completed).toBeFalsy()
            expect(todo.title).toBe(newTodoTitle)
            expect(status).toBe(ActionStatus.Loaded)
        })

        it("Failed action should define create action error message & status", () =>
        {
            // Arrange
            const expectedErrorMessage : string = 'HTTP Error 500 (Internal Server)'
            const createTodoFailedAction : Action<Failure<ICreateTodoAction, ICreateTodoFailedAction>> = createTodo.failed(
            { 
                params : { title : '' }, 
                error : { errorMessage : expectedErrorMessage }
            })

            // Act
            const { createAction : { status, errorMessage } } : ITodosState = todoReducer(initialTodoState, createTodoFailedAction)

            // Assert
            expect(errorMessage).toBe(expectedErrorMessage)
            expect(status).toBe(ActionStatus.Failed)
        })
    })

    describe("UPDATE_TODO", () => 
    {
        it("Should update an existing todo", () =>
        {
            // Arrange
            const existingTodo : ITodo = { id : '1', completed : false, title : 'Faire les courses'}
            const initialState : ITodosState = { ...initialTodoState, todos : [existingTodo] }
            const newTodoTitle : string = 'Acheter du poivre'
            const updateTodoAction : Action<IUpdateTodoAction> = updateTodo.started({ id : existingTodo.id, newTitle : newTodoTitle })
    
            // Act
            const { todos } : ITodosState = todoReducer(initialState, updateTodoAction)
            const todo = todos[0]
    
            // Assert
            expect(todos).toHaveLength(1)
            expect(todo.completed).toBeFalsy()
            expect(todo.title).toBe(newTodoTitle)
        })

        it("Should throw an exception when the todo don't exists", () =>
        {
            // Arrange
            const initialState : ITodosState = { ...initialTodoState, todos : [] }
            const updateTodoAction : Action<IUpdateTodoAction> = updateTodo.started({ id : newGuid(), newTitle : 'Acheter du poivre' })

             // Act & Assert
             expect(() => todoReducer(initialState, updateTodoAction)).toThrow()
        })
    })

    describe("TOGGLE_TODO", () => 
    {
        it("Should toggle an existing todo", () =>
        {
            // Arrange
            const existingTodo : ITodo = { id : '1', completed : false, title : 'Faire les courses'}
            const initialState : ITodosState = { ...initialTodoState, todos : [existingTodo] }
            const toggleTodoAction : Action<IToggleTodoAction> = toggleTodo.started({ id : existingTodo.id })
    
            // Act
            const { todos } : ITodosState = todoReducer(initialState, toggleTodoAction)
            
            // Assert
            expect(todos).toHaveLength(1)
            expect(todos[0].completed).toBeTruthy()
        }),

        it("Should throw an exception when the todo don't exists", () =>
        {
            // Arrange
            const initialState : ITodosState = { ...initialTodoState, todos : [] }
            const toggleTodoAction : Action<IToggleTodoAction> = toggleTodo.started({ id : newGuid() })

             // Act & Assert
             expect(() => todoReducer(initialState, toggleTodoAction)).toThrow()
        })
    })

    describe("DELETE_TODO", () => 
    {    
        it("should delete an existing todo", () =>
        {
            // Arrange
            const existingTodo : ITodo = { id : '1', completed : false, title : 'Faire les courses'}
            const initialState : ITodosState = { ...initialTodoState, todos : [existingTodo] }
            const deleteTodoAction : Action<IToggleTodoAction> = deleteTodo.started({ id : existingTodo.id })

            // Act
            const { todos } : ITodosState = todoReducer(initialState, deleteTodoAction)

            // Assert
            expect(todos).toHaveLength(0)
        })

        it("Should not throw an exception when the todo don't exists", () =>
        {
            // Arrange
            const initialState : ITodosState = { ...initialTodoState, todos : [] }
            const deleteTodoAction : Action<IDeleteTodoAction> = deleteTodo.started({ id : newGuid() })

             // Act & Assert
             expect(() => todoReducer(initialState, deleteTodoAction)).not.toThrow()
        })
    })

    it("UPDATE_TODO_FILTERS should update the todo filters", () =>
    {
        // Arrange
        const initialState : ITodosState = { ...initialTodoState, todos : [] }
        const newTodoFilters : ITodoFilters = { onlyUncompleted : true, terms : 'courses' }
        const updateTodoFiltersAction : Action<IUpdateTodoFiltersAction> = updateTodoFilters({ filters : newTodoFilters })

        // Act
        const { todos, filters } : ITodosState = todoReducer(initialState, updateTodoFiltersAction)

        // Assert
        expect(todos).toHaveLength(0)
        expect(filters).toEqual(newTodoFilters)
    })
})