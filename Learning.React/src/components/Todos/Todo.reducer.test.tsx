import { ITodoFilters, Todo } from './Todo.model'
import todoReducer, { ITodosState } from './Todo.reducer'
import { createTodo, deleteTodo, TodoActions, toggleTodo, updateTodo, updateTodoFilters } from './Todo.action'

describe("TodoReducer", () =>
{
  it("CREATE_TODO should create a new todo", () => {
        const initialState : ITodosState = { todos : [], filters : { onlyUncompleted : false, terms : '' }}
        const newTodoTitle : string = 'Faire les courses'
        const createTodoAction : TodoActions = createTodo(newTodoTitle)

        // Act
        const newState : ITodosState = todoReducer(initialState, createTodoAction)

        // Assert
        expect(newState.todos.length).toBe(1)
        expect(newState.todos[0].completed).toBeFalsy()
        expect(newState.todos[0].title).toBe(newTodoTitle)
    }),

    it("UPDATE_TODO should update an existing todo", () => {
        const existingTodo : Todo = { id : '1', completed : false, title : 'Faire les courses'}
        const initialState : ITodosState =
        {
            todos : [ existingTodo ],
            filters : { onlyUncompleted : false, terms : '' }
        }
        const newTodoTitle : string = 'Acheter du poivre'
        const updateTodoAction : TodoActions = updateTodo(existingTodo.id, newTodoTitle)

        // Act
        const newState : ITodosState = todoReducer(initialState, updateTodoAction)

        // Assert
        expect(newState.todos.length).toBe(1)
        expect(newState.todos[0].completed).toBeFalsy()
        expect(newState.todos[0].title).toBe(newTodoTitle)
    }),

    it("TOGGLE_TODO should toggle an existing todo", () => {
        const existingTodo : Todo = { id : '1', completed : false, title : 'Faire les courses'}
        const initialState : ITodosState =
        {
            todos : [ existingTodo ],
            filters : { onlyUncompleted : false, terms : '' }
        }
        const toggleTodoAction : TodoActions = toggleTodo(existingTodo.id)

        // Act
        const newState : ITodosState = todoReducer(initialState, toggleTodoAction)

        // Assert
        expect(newState.todos.length).toBe(1)
        expect(newState.todos[0].completed).toBeTruthy()
    }),

    it("DELETE_TODO should delete an existing todo", () => {
        const existingTodo : Todo = { id : '1', completed : false, title : 'Faire les courses'}
        const initialState : ITodosState =
        {
            todos : [ existingTodo ],
            filters : { onlyUncompleted : false, terms : '' }
        }
        const deleteTodoAction : TodoActions = deleteTodo(existingTodo.id)

        // Act
        const newState : ITodosState = todoReducer(initialState, deleteTodoAction)

        // Assert
        expect(newState.todos.length).toBe(0)
    }),

    it("UPDATE_TODO_FILTERS should update to do filters", () => {
        const initialState : ITodosState = { todos : [], filters : { onlyUncompleted : false, terms : '' }}
        const newTodoFilters : ITodoFilters = { onlyUncompleted : true, terms : 'courses' }
        const updateTodoFiltersAction : TodoActions = updateTodoFilters(newTodoFilters)

        // Act
        const newState : ITodosState = todoReducer(initialState, updateTodoFiltersAction)

        // Assert
        expect(newState.todos.length).toBe(0)
        expect(newState.filters).toEqual(newTodoFilters)
    })
})