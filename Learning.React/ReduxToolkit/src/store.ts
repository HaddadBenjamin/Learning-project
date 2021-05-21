import ITodo from './components/todos/todo.model'
import { createSlice, createEntityAdapter, configureStore, combineReducers, createAction } from '@reduxjs/toolkit'
// import { useDispatch } from 'react-redux'
export default configureStore({ reducer : {}}) //combineReducers({ todos : todosSlice.reducer }) })


// store/todos/todo.action.ts
// export const createTodo = createAction<ITodo>('TODO_CREATE')
// export const setTodos = createAction<ITodo[]>('TODO_SETALL')


// store/todos/todo.reducer.ts
// export const initialTodoState : ITodo[] = [
//     { id : '1', title : 'Faire la bouffe', checked : false },
//     { id : '2', title : 'Faire la bouffe2', checked : false },
//     { id : '3', title : 'Faire la bouffe3', checked : false }]
// const todosAdapter = createEntityAdapter<ITodo>(
// {
//     selectId : todo => todo.id,
//     sortComparer : (a, b) => a.id.toString().localeCompare(b.id.toString())
// })
// const todosSlice = createSlice(
// {
//     name : 'todos',
//     initialState : todosAdapter.getInitialState(),
//     reducers: { increment : state => state }
//     // extraReducers : builder => builder
//     //     .addCase(createTodo, (state, { payload }) => todosAdapter.addOne(state, payload))
//     //     .addCase(setTodos, (state, { payload }) => todosAdapter.setAll(state, payload))
// })


// store/root.reducer.ts :
// export const rootReducer = combineReducers({ todos : todosSlice.reducer })
// export type IGlobalState = ReturnType<typeof rootReducer>


// store/store.ts :
// type AppDispatch = typeof store.dispatch
// export const useAppDispatch = () => useDispatch<AppDispatch>()


// store/todos/todo.selector.ts : ces selecteurs se basent sur la libraire reselect, ils sont mémoïsés.
// const selectTodosState = (globalState : IGlobalState) => globalState.todos 
// const selectTodosStateFromAdapter = todosAdapter.getSelectors<IGlobalState>(state => state.todos)
// export const { selectTodos, selectTodoById, selectTodoByTitle } =
// {
//     selectTodos : () => selectTodosStateFromAdapter.selectAll(store.getState()),
//     selectTodoById : (id : EntityId) => selectTodosStateFromAdapter.selectById(store.getState(), id),
//     selectTodoByTitle : (title : string) => createDraftSafeSelector(selectTodosState, todosState => Object
//         .keys(todosState.entities)
//         // @ts-ignore
//         .find(todoId => todosState.entities[todoId].title === title))
// }


// components :
// const dispatch = useAppDispatch()
// const todo = selectTodoByTitle('Faire la bouffe')
// useEffect(() => dispatch(setTodos(initialTodoState)), [])