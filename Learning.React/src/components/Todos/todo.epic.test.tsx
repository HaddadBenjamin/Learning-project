// todo : https://blog.masuqat.net/2018/12/01/typescript-fsa-async-process/

// import { TestScheduler } from 'rxjs/testing'
// import { createTodo, ICreateTodoAction, TodoActions } from './todo.action'
// import { createTodoEpic } from './todo.epic'

// describe("todo.epic", () =>
// {
//     it('create to do action should return a new todo', () =>
//     {
//         const testScheduler = new TestScheduler((actual, expected) => {})
        
//         testScheduler.run(({ hot, expectObservable }) =>
//         {
//             const payload : ICreateTodoAction = { title : 'Faire les courses' }
//             const action$ = hot('-a', { a : createTodo.started(payload) })
//             const state$ = null
          
//             const output$ = createTodoEpic(action$, state$, undefined);
          
//             expectObservable(output$).toBe('249ms -a)',
//             {
//                 a : createTodo.done(
//                 { 
//                     params : payload,  
//                     result : { todo :  { id : 'newGuid', title : payload.title, completed : false } }
//                 })
//             });
//           });
//     })
// })