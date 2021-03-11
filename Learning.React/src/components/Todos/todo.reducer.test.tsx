import { ITodoFilters, ITodo } from './todo.model'
import todoReducer, { initialTodoState, ITodosState } from './todo.reducer'
import { createTodo, deleteTodo, ICreatedTodoAction, ICreateTodoAction, ICreateTodoFailedAction, IDeletedTodoAction, IDeleteTodoAction, IToggledTodoAction, IToggleTodoAction, IToggleTodoFailedAction, IUpdatedTodoAction, IUpdateTodoAction, IUpdateTodoFailedAction, IUpdateTodoFiltersAction, toggleTodo, updateTodo, updateTodoFilters, IDeleteTodoFailedAction, getTodos, IGetTodosAction, IGotTodosAction, IGetTodosFailedAction } from './todo.action'
import { Action, Failure, Success } from 'typescript-fsa'
import { newGuid } from '../../shared/helpers/stringHelpers'
import ActionStatus from '../../shared/models/actionStatus'

describe("TodoReducer", () =>
{
    describe("GET_TODOS", () =>
    {
        it("Start get todos action should set get todos action status to loading and error message to null", () =>
        {
            // Arrange 
            const getTodosAction : Action<IGetTodosAction> = getTodos.started({ })

            // Assert
            const { getAction : { status, errorMessage }} : ITodosState = todoReducer(initialTodoState, getTodosAction)

            // Assert
            expect(status).toBe(ActionStatus.Loading)
            expect(errorMessage).toBeNull()
        })

        it("Done get todos action should set todos, get todos action status to loading and error message to null", () =>
        {
            // Arrange
            const expectedTodos : ITodo[] = 
            [
                { id : '1', completed : false, title : 'Faire les courses' },
                { id : '2', completed : false, title : 'Faire à manger' }
            ]
            const gotTodosAction : Action<Success<IGetTodosAction, IGotTodosAction>> = getTodos.done(
            {
                params : {},
                result : { todos : expectedTodos}
            })

            // Act
            const { todos, getAction : { status, errorMessage }} : ITodosState = todoReducer(initialTodoState, gotTodosAction)

            // Assert
            expect(status).toBe(ActionStatus.Loaded)
            expect(errorMessage).toBeNull()
            expect(todos).toEqual(expectedTodos)
        })

        it("Failed get todos action should set get todos action status to failed and error message", () =>
        {
            // Arrange
            const expectedErrorMessage : string = 'HTTP Error 500 (Internal Server)'
            const getTodosFailedAction : Action<Failure<IGetTodosAction, IGetTodosFailedAction>> = getTodos.failed(
            {
                params : {},
                error : { errorMessage : expectedErrorMessage}
            })

            // Act
            const { getAction : { status, errorMessage }} : ITodosState = todoReducer(initialTodoState, getTodosFailedAction)

            // Assert
            expect(errorMessage).toBe(expectedErrorMessage)
            expect(status).toBe(ActionStatus.Failed)
        })
    })
    describe('CREATE_TODO', () => 
    {
        it("Start create action should set create action status to loading and error message to null", () =>
        {
            // Arrange
            const createTodoAction : Action<ICreateTodoAction> = createTodo.started({ title : 'Faire les courses' })

            // Act
            const { createAction : { status, errorMessage }} : ITodosState = todoReducer(initialTodoState, createTodoAction)
            
            // Assert
            expect(status).toBe(ActionStatus.Loading)
            expect(errorMessage).toBeNull()
        })

        it("Done create action should create a new todo and set create action status to loaded and error message to null", () =>
        {
            // Arrange
            const initialState : ITodosState = { ...initialTodoState, todos : [] }
            const todoTitle : string = 'Faire les courses'
            const createdTodoAction : Action<Success<ICreateTodoAction, ICreatedTodoAction>> = createTodo.done(
            { 
                params : { title : todoTitle },
                result : { todo : { id : newGuid(), completed : false, title : todoTitle } }
            })
    
            // Act
            const { todos, createAction : { status }} : ITodosState = todoReducer(initialState, createdTodoAction)
            const todo : ITodo = todos[0]

            // Assert
            expect(todos).toHaveLength(1)
            expect(todo.completed).toBeFalsy()
            expect(todo.title).toBe(todoTitle)
            expect(status).toBe(ActionStatus.Loaded)
        })

        it("Failed create action should set create action error message to null and status to failed", () =>
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
    it("Start update action should set update action status to loading and error message to null", () =>
        {
            // Arrange
            const existingTodo : ITodo = { id : '1', completed : false, title : 'Faire les courses'}
            const updateTodoAction : Action<IUpdateTodoAction> = updateTodo.started({ id : existingTodo.id, newTitle : 'Acheter du poivre' })
            const initialState : ITodosState = { ...initialTodoState, todos : [existingTodo] }

            // Act
            const { updateAction : { status, errorMessage }} : ITodosState = todoReducer(initialState, updateTodoAction)
                
            // Assert
            expect(status).toBe(ActionStatus.Loading)
            expect(errorMessage).toBeNull()
        })

        describe("Done action", () =>
        {
            it("Should update an existing todo and set update action status to loaded and error message to null", () =>
            {
                // Arrange
                const existingTodo : ITodo = { id : '1', completed : false, title : 'Faire les courses'}
                const initialState : ITodosState = { ...initialTodoState, todos : [existingTodo] }
                const newTodoTitle : string = 'Acheter du poivre'
                const updatedTodoAction : Action<Success<IUpdateTodoAction, IUpdatedTodoAction>> = updateTodo.done(
                { 
                    params : { id : existingTodo.id, newTitle : newTodoTitle }, 
                    result : { todo : { ...existingTodo, title : newTodoTitle } }
                }) 
        
                // Act
                const { todos, updateAction : { status, errorMessage } } : ITodosState = todoReducer(initialState, updatedTodoAction)
                const todo = todos[0]
        
                // Assert
                expect(todos).toHaveLength(1)
                expect(todo.completed).toBeFalsy()
                expect(todo.title).toBe(newTodoTitle)
                expect(status).toBe(ActionStatus.Loaded)
                expect(errorMessage).toBeNull()
            })
    
            it("Should throw an exception when the todo don't exists", () =>
            {
                // Arrange
                const initialState : ITodosState = { ...initialTodoState, todos : [] }
                const updatedTodoAction : Action<Success<IUpdateTodoAction, IUpdatedTodoAction>> = updateTodo.done(
                {
                    params : { id : newGuid(), newTitle : 'Acheter du poivre'  },
                    result : { todo : { id : '1', completed : false, title : 'Faire les courses' } }
                })
    
                 // Act & Assert
                 expect(() => todoReducer(initialState, updatedTodoAction)).toThrow()
            })
        })

        it("Failed update action should set update action status to failed and error message", () =>
        {
            // Arrange
            const expectedErrorMessage : string = 'HTTP Error 500 (Internal Server)'
            const updateTodoFailedAction : Action<Failure<IUpdateTodoAction, IUpdateTodoFailedAction>> = updateTodo.failed(
            { 
                params : { id : '1', newTitle : '' }, 
                error : { errorMessage : expectedErrorMessage }
            })

            // Act
            const { updateAction : { status, errorMessage } } : ITodosState = todoReducer(initialTodoState, updateTodoFailedAction)

            // Assert
            expect(errorMessage).toBe(expectedErrorMessage)
            expect(status).toBe(ActionStatus.Failed)
        })
    })

    describe("TOGGLE_TODO", () => 
    {
        it("Start toggle action should set toggle action status to loading and error message to null", () =>
        {
            // Arrange
            const existingTodo : ITodo = { id : '1', completed : false, title : 'Faire les courses'}
            const initialState : ITodosState = { ...initialTodoState, todos : [existingTodo] }
            const toggleTodoAction : Action<IToggleTodoAction> = toggleTodo.started({ id : existingTodo.id })

            // Act
            const { toggleAction : { status, errorMessage } } : ITodosState = todoReducer(initialState, toggleTodoAction)

            // Assert
            expect(status).toBe(ActionStatus.Loading)
            expect(errorMessage).toBeNull()
        })
        
        it("Done toggle action should toggle an existing todo and set toggle action status to loaded and error message to null ", () =>
        {
            // Arrange
            const existingTodo : ITodo = { id : '1', completed : false, title : 'Faire les courses'}
            const initialState : ITodosState = { ...initialTodoState, todos : [existingTodo] }
            const toggledTodoAction : Action<Success<IToggleTodoAction, IToggledTodoAction>> = toggleTodo.done(
            {
                params : { id : existingTodo.id },
                result : { todo : { ...existingTodo, completed : true } }
            })
    
            // Act
            const { todos, toggleAction : { status, errorMessage } } : ITodosState = todoReducer(initialState, toggledTodoAction)
            
            // Assert
            expect(todos).toHaveLength(1)
            expect(todos[0].completed).toBeTruthy()
            expect(status).toBe(ActionStatus.Loaded)
            expect(errorMessage).toBeNull()
        })

        describe("Failed toggle action should set toggle action status to failed and error message", () =>
        {
            // Arrange
            const expectedErrorMessage : string = 'HTTP Error 500 (Internal Server)'
            const existingTodo : ITodo = { id : '1', completed : false, title : 'Faire les courses'}
            const initialState : ITodosState = { ...initialTodoState, todos : [existingTodo] }
            const toggleTodoFailedAction : Action<Failure<IToggleTodoAction, IToggleTodoFailedAction>> = toggleTodo.failed(
            {
                params : { id : existingTodo.id },
                error : { errorMessage : expectedErrorMessage }
            })
    
            // Act
            const { todos, toggleAction : { status, errorMessage } } : ITodosState = todoReducer(initialState, toggleTodoFailedAction)
            
            // Assert
            expect(status).toBe(ActionStatus.Failed)
            expect(errorMessage).toBe(expectedErrorMessage)
        })
    })

    describe("DELETE_TODO", () => 
    {
        it("Start delete action should set delete action status to loading and error message to null", () =>
        {
            // Arrange
            const existingTodo : ITodo = { id : '1', completed : false, title : 'Faire les courses'}
            const initialState : ITodosState = { ...initialTodoState, todos : [existingTodo] }
            const deleteTodoAction : Action<IDeleteTodoAction> = deleteTodo.started({ id : existingTodo.id })

            // Act
            const { deleteAction : { status, errorMessage } } : ITodosState = todoReducer(initialState, deleteTodoAction)
            
            // Assert
            expect(status).toBe(ActionStatus.Loading)
            expect(errorMessage).toBeNull()
        })

        it("Done delete action should delete an existing todo and set delete action status to loaded and error message to null", () =>
        {
            // Arrange
            const existingTodo : ITodo = { id : '1', completed : false, title : 'Faire les courses'}
            const initialState : ITodosState = { ...initialTodoState, todos : [existingTodo] }
            const deletedTodoAction : Action<Success<IDeleteTodoAction, IDeletedTodoAction>> = deleteTodo.done(
            {
                params : { id : existingTodo.id },
                result : { id : existingTodo.id }
            })

            // Act
            const { todos, deleteAction : { status, errorMessage } } : ITodosState = todoReducer(initialState, deletedTodoAction)

            // Assert
            expect(todos).toHaveLength(0)
            expect(status).toBe(ActionStatus.Loaded)
            expect(errorMessage).toBeNull()
        })

        it("Failed delete action should set delete action status to failed and error message", () =>
        {
            // Arrange
            const expectedErrorMessage : string = 'HTTP Error 500 (Internal Server)'
            const existingTodo : ITodo = { id : '1', completed : false, title : 'Faire les courses'}
            const initialState : ITodosState = { ...initialTodoState, todos : [existingTodo] }
            const deleteTodoFailedAction : Action<Failure<IDeleteTodoAction, IDeleteTodoFailedAction>> = deleteTodo.failed(
            {
                params : { id : existingTodo.id },
                error : { errorMessage : expectedErrorMessage }
            })
            
            // Act
            const { deleteAction : { status, errorMessage } } : ITodosState = todoReducer(initialState, deleteTodoFailedAction)

            // Assert
            expect(status).toBe(ActionStatus.Failed)
            expect(errorMessage).toBe(expectedErrorMessage)
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