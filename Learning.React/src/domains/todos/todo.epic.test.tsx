import { TestScheduler } from 'rxjs/testing'
import { IEpicDependencies } from '../../root.epic'
import { createTodoEpic } from './todo.epic'
import { mockDeep, MockProxy } from 'jest-mock-extended';
import { ITodo } from './todo.model'
import { AxiosResponse } from 'axios'
import { createTodo, TodoActions } from './todo.action';

// Work in progress : on est encore loin d'un code réutilisable et selon moi acceptable.
it("create todo", done =>
{
    // Arrange
    const testScheduler = new TestScheduler((actual, expected) => {  });
    testScheduler.run(({ hot, cold, expectObservable }) =>
    {
        const todo : ITodo = { id : '2', title : 'Faire les courses', completed : false }
        const mockEpicDependencies : MockProxy<IEpicDependencies> & IEpicDependencies = mockDeep<IEpicDependencies>()
        mockEpicDependencies.repositories.todo.create.mockReturnValue(todo)
    
        const axiosReponseMock : MockProxy<AxiosResponse<ITodo>> & AxiosResponse<ITodo> = mockDeep<AxiosResponse<ITodo>>()
        axiosReponseMock.data = todo
        const responseMock : Promise<AxiosResponse<ITodo>> = new Promise<AxiosResponse<ITodo>>(resolve => resolve(axiosReponseMock))
    
        mockEpicDependencies.apis.todo.create.mockReturnValue(responseMock)

        const actionPayload = { title : todo.title }
        const action$ = hot('-a', { a : createTodo.started(actionPayload) });
        const state$ = null;
        const epicDependencies =
        {
            ...mockEpicDependencies,
            apis :
            {
                todo :
                {
                    ...mockEpicDependencies.apis.todo,
                    create : title => cold('--a', { a : { responseMock } })
                }
            }
        }

        // Act
        const output$ = createTodoEpic(action$, state$, epicDependencies as any);

        // Assert
        expectObservable(output$).toBe('---a',
        {
            a :
            {
                type: TodoActions.CREATE_TODO_STARTED,
                response : { params : actionPayload, result : { todos : [todo] } } 
            }
        })

        done()
    });
})