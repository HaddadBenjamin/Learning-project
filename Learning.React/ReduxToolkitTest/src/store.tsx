// import todoReducer from './domains/todos/todo.reducer'
import { useDispatch } from 'react-redux'
import { configureStore, combineReducers, createSlice, createEntityAdapter, createAction } from '@reduxjs/toolkit'
import { ITodo, ITodoFilters } from './domains/todos/todo.model'

// components/todo.action.tsx :
//import { getTodos, toggleTodo, updateTodoFilters } from './todo.action'
const createTodo = createAction<ITodo>('createTodo')
const upsertTodo = createAction<ITodo>('upsertTodo')
const deleteTodo = createAction<string>('deleteTodo')
const getTodos = createAction('getTodos')

export { createTodo, upsertTodo, deleteTodo as removeTodo, getTodos as setTodos }


// components/todos/todo.reducer.tsx :77
import IActionMetadata from './shared/models/actionMetadata'
import { loadedActionMetadata, loadingActionMetadata, failedActionMetadataByAction } from './shared/models/actionMetadata'
// export interface IGlobalState { todos : ITodosState }

export interface ITodosState
{
    todos : ITodo[]
    filters : ITodoFilters
    getAction : IActionMetadata
    createAction : IActionMetadata
    updateAction : IActionMetadata
    toggleAction : IActionMetadata
    deleteAction : IActionMetadata
}

export const initialTodoState : ITodosState =
{
    todos : [],
    filters :
    {
        terms : '',
        onlyUncompleted : false
    },
    getAction : loadedActionMetadata,
    createAction : loadedActionMetadata,
    updateAction : loadedActionMetadata,
    toggleAction : loadedActionMetadata,
    deleteAction : loadedActionMetadata
}

const todosAdapter = createEntityAdapter<ITodo>(
{
	selectId : todo => todo.id,
	sortComparer : (a, b) => a.id.localeCompare(b.id)
})

export const todosSlice = createSlice(
{
	name: 'todos',
	reducers : {},
	initialState: {...initialTodoState, ...todosAdapter.getInitialState() },
	extraReducers: (builder) => builder
		.addCase(getTodos, (state, action) => todosAdapter.setAll(state, action.payload))
		.addCase(createTodo, (state, action) => todosAdapter.addOne(state, action.payload))
		.addCase(addTodo, (state, action) => todosAdapter.addOne(state, action.payload))
		.addCase(upsertTodo, (state, action) => todosAdapter.upsertOne(state, action.payload))
		.addCase(deleteTodo, (state, action) => todosAdapter.removeOne(state, action.payload))
})

export type RootState = ReturnType<typeof rootReducer>
// export const todosSlice.extraReducers


// store.tsx :
const rootReducer = combineReducers({todos : todoReducer })
const store = configureStore(
{ 
	reducer : rootReducer, 
	middleware : getDefaultMiddleware => getDefaultMiddleware(),
	// <{ thunk : false, immutableCheck : true, serializableCheck : true }>().concat(epicMiddleware), // si redux observable 
	// // @ts-ignore // epicMiddleware.run(rootEpic)
	devTools: process.env.NODE_ENV !== 'production'
})

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()






// components/todos/todo.selectors.tsx
export const
{
	selectById: selectUserById,
	selectIds: selectUserIds,
	selectEntities: selectUserEntities,
	selectAll: selectAllUsers,
	selectTotal: selectTotalUsers,
} = todosAdapter.getSelectors() // useSelector : import { useSelector } from 'react-redux'

// export const { addTodo, upsertTodo, removeTodo, setTodos } = todosSlice.actions

export default store
