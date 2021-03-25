import { TestScheduler } from 'rxjs/testing'
import { IEpicDependencies } from '../../root.epic'
import { createTodoEpic } from './todo.epic'
import { mockDeep, MockProxy } from 'jest-mock-extended';
import { ITodo } from './todo.model'
import { AxiosResponse } from 'axios'

it("create todo", done =>
{
    const todo : ITodo = { id : '2', title : 'Faire les courses', completed : false }
    const mockEpicDependencies : MockProxy<IEpicDependencies> & IEpicDependencies = mockDeep<IEpicDependencies>()
    mockEpicDependencies.repositories.todo.create.mockReturnValue(todo)

    const axiosReponseMock : MockProxy<AxiosResponse<ITodo>> & AxiosResponse<ITodo> = mockDeep<AxiosResponse<ITodo>>()
    axiosReponseMock.data = todo
    const responseMock : Promise<AxiosResponse<ITodo>> = new Promise<AxiosResponse<ITodo>>(resolve => resolve(axiosReponseMock))

    mockEpicDependencies.apis.todo.create.mockReturnValue(responseMock)
    const testScheduler : TestScheduler = new TestScheduler((actual, expected) => {});

    testScheduler.run(({ hot, cold, expectObservable }) =>
    {
        // TODO -> j'y suis là.
        const action$ = hot('-a', { a: { type: 'FETCH_USER', id: '123' } });
        const state$ = null;
        const dependencies = {
            getJSON: url => cold('--a', {
            a: { url }
            })
    };

    const output$ = createTodoEpic(action$, state$, mockEpicDependencies);

    expectObservable(output$).toBe('---a', {
        a: {
        type: 'FETCH_USER_FULFILLED',
        response: {
            url: 'https://api.github.com/users/123'
        }
        }
    });
    });
})