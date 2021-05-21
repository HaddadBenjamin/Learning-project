import { ITodoFilters, ITodo } from './todo.model'
import todoReducer, { initialTodoState, ITodosState } from './todo.reducer'
import { createTodo, deleteTodo, ICreatedTodoAction, ICreateTodoAction, ICreateTodoFailedAction, IDeletedTodoAction, IDeleteTodoAction, IToggledTodoAction, IToggleTodoAction, IToggleTodoFailedAction, IUpdatedTodoAction, IUpdateTodoAction, IUpdateTodoFailedAction, IUpdateTodoFiltersAction, toggleTodo, updateTodo, updateTodoFilters, IDeleteTodoFailedAction, getTodos, IGetTodosAction, IGotTodosAction, IGetTodosFailedAction } from './todo.action'
import { Action, Failure, Success } from 'typescript-fsa'
import { newGuid } from '../../shared/helpers/stringHelpers'
import { failedActionMetadataByErrorMessage, loadedActionMetadata, loadingActionMetadata } from '../../shared/models/actionMetadata'

describe("GET_TODOS", () =>
{
    it("Start get todos action should set get todos action status to loading and error message to null", () =>
    {
        // Arrange 
        const getTodosAction : Action<IGetTodosAction> = getTodos.started({ })

        // Assert
        const { getAction } : ITodosState = todoReducer(initialTodoState, getTodosAction)

        // Assert
        expect(getAction).toEqual(loadingActionMetadata)
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
        const { todos, getAction } : ITodosState = todoReducer(initialTodoState, gotTodosAction)

        // Assert
        expect(getAction).toEqual(loadedActionMetadata)
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
        const { getAction } : ITodosState = todoReducer(initialTodoState, getTodosFailedAction)

        // Assert
        expect(getAction).toEqual(failedActionMetadataByErrorMessage(expectedErrorMessage))
    })
})
describe('CREATE_TODO', () => 
{
    it("Start create action should set create action status to loading and error message to null", () =>
    {
        // Arrange
        const createTodoAction : Action<ICreateTodoAction> = createTodo.started({ title : 'Faire les courses' })

        // Act
        const { createAction } : ITodosState = todoReducer(initialTodoState, createTodoAction)
        
        // Assert
        expect(createAction).toEqual(loadingActionMetadata)
    })

    it("Done create action should create a new todo and set create action status to loaded and error message to null", () =>
    {
        // Arrange
        const initialState : ITodosState = { ...initialTodoState, todos : [] }
        const expectedTodoTitle : string = 'Faire les courses'
        const createdTodoAction : Action<Success<ICreateTodoAction, ICreatedTodoAction>> = createTodo.done(
        { 
            params : { title : expectedTodoTitle },
            result : { todo : { id : newGuid(), completed : false, title : expectedTodoTitle } }
        })

        // Act
        const { todos, createAction } : ITodosState = todoReducer(initialState, createdTodoAction)
        const expectedTodos : ITodo[] = [{ title : expectedTodoTitle, completed : false, id : todos[0].id }]

        // Assert
        expect(todos).toEqual(expectedTodos)
        expect(createAction).toEqual(loadedActionMetadata)
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
        const { createAction } : ITodosState = todoReducer(initialTodoState, createTodoFailedAction)

        // Assert
        expect(createAction).toEqual(failedActionMetadataByErrorMessage(expectedErrorMessage))
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
        const { updateAction } : ITodosState = todoReducer(initialState, updateTodoAction)
            
        // Assert
        expect(updateAction).toEqual(loadingActionMetadata)
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
            const { todos, updateAction } : ITodosState = todoReducer(initialState, updatedTodoAction)
            const expectedTodos : ITodo[] = [{ ...existingTodo, title : newTodoTitle }]
    
            // Assert
            expect(todos).toEqual(expectedTodos)
            expect(updateAction).toEqual(loadedActionMetadata)
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
        const { updateAction } : ITodosState = todoReducer(initialTodoState, updateTodoFailedAction)

        // Assert
        expect(updateAction).toEqual(failedActionMetadataByErrorMessage(expectedErrorMessage))
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
        const { toggleAction } : ITodosState = todoReducer(initialState, toggleTodoAction)

        // Assert
        expect(toggleAction).toEqual(loadingActionMetadata)
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
        const { todos, toggleAction } : ITodosState = todoReducer(initialState, toggledTodoAction)
        const expectedTodos : ITodo[] = [{ ...existingTodo, completed : true }]
        
        // Assert
        expect(todos).toEqual(expectedTodos)
        expect(toggleAction).toEqual(loadedActionMetadata)
    })

    it("Failed toggle action should set toggle action status to failed and error message", () =>
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
        const { toggleAction } : ITodosState = todoReducer(initialState, toggleTodoFailedAction)
        
        // Assert
        expect(toggleAction).toEqual(failedActionMetadataByErrorMessage(expectedErrorMessage))
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
        const { deleteAction } : ITodosState = todoReducer(initialState, deleteTodoAction)
        
        // Assert
        expect(deleteAction).toEqual(loadingActionMetadata)
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
        const { todos, deleteAction } : ITodosState = todoReducer(initialState, deletedTodoAction)

        // Assert
        expect(todos).toHaveLength(0)
        expect(deleteAction).toEqual(loadedActionMetadata)
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
        const { deleteAction } : ITodosState = todoReducer(initialState, deleteTodoFailedAction)

        // Assert
        expect(deleteAction).toEqual(failedActionMetadataByErrorMessage(expectedErrorMessage))
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