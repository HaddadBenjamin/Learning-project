import { ITodo } from '../../domains/todos/todo.model'
import { render } from '@testing-library/react'
import React from 'react'
import TodoTable from './TodoTable'
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { IGlobalState, initialGlobalState } from '../../root.reducer'
import { querySelectorWithThrow } from '../../shared/helpers/reactTestingLibaryHelpers'
import { initialTodoState } from '../../domains/Todos/todo.reducer'

it("Should be correctly mounted", () =>
{
    // Arrange
    const todos : ITodo[] = [
        { id : "1", title : "faire la vaiselle", completed : false },
        { id : "2", title : "acheter du poisson", completed : true }
    ]
    let globalState : IGlobalState = { ...initialGlobalState, todos : { ...initialTodoState, todos : todos } }
    const mockStore = configureStore()(globalState)
    
    // Act
    render(<Provider store={mockStore}>
      <TodoTable/>
    </Provider>)

    const table : HTMLTableElement = querySelectorWithThrow(document, 'table')
    const thead : HTMLTableSectionElement = querySelectorWithThrow(table, 'thead')
    const tr : HTMLTableRowElement = querySelectorWithThrow(thead, 'tr')
    const ths : NodeListOf<HTMLTableHeaderCellElement> = tr.querySelectorAll('th')
    const tbody : HTMLTableSectionElement = querySelectorWithThrow(table, 'tbody')
    const trsInsideTbody : NodeListOf<HTMLTableRowElement> = tbody.querySelectorAll('tr')
    const actualThTextContents : (string | null)[] = Array.from(ths).map(th => th.textContent)
    const expectedThTextContents : string[] = ['Completed', 'Title', 'Publish edition', 'Remove']

    // Assert
    expect(trsInsideTbody).toHaveLength(2)

    expect(table.className).toBe('table table-dark table-striped')

    expect(actualThTextContents).toEqual(expectedThTextContents)
})