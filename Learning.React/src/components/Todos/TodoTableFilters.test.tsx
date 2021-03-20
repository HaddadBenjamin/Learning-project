import { fireEvent, render } from '@testing-library/react'
import React from 'react'
import TodoTableFilters from './TodoTableFilters'
import { IGlobalState, initialGlobalState } from '../../root.reducer'
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { initialTodoState } from '../../domains/todos/todo.reducer'
import { querySelectorWithThrow } from '../../shared/helpers/reactTestingLibaryHelpers'
import { TodoActions } from '../../domains/todos/todo.action'

it("Should be correctly mounted", () =>
{
    // Arrange
    let globalState : IGlobalState = {  ...initialGlobalState, todos: { ...initialTodoState, filters :  { terms : '', onlyUncompleted : true } } }
    const mockStore = configureStore()(globalState)
    
    // Act
    render(<Provider store={mockStore}>
        <TodoTableFilters/>
    </Provider>)

    const divs : NodeListOf<HTMLDivElement> = document.querySelectorAll('div')
    const inputSearchInput : HTMLInputElement = querySelectorWithThrow(divs[1], 'input')
    const checkboxInput : HTMLInputElement = querySelectorWithThrow(divs[2], 'input')
    const checkboxLabel : HTMLLabelElement = querySelectorWithThrow(divs[2], 'label')

    const firstDivStyle : CSSStyleDeclaration = window.getComputedStyle(divs[1])
    const actualDivClassNames : string[] = Array.from(divs).map(div => div.className)
    const expectedDivClassNames : string[] = ['', 'form-group', 'form-check']
    
    // Assert
    expect(actualDivClassNames).toEqual(expectedDivClassNames)
    expect(firstDivStyle.marginTop).toBe('-7.5px')

    expect(inputSearchInput.placeholder).toBe("Search...")
    expect(inputSearchInput.className).toBe("form-control")

    expect(checkboxInput.className).toBe('form-check-label')
    expect(checkboxLabel.className).toBe('form-check-label ml-1')
    expect(checkboxLabel.textContent).toBe('Only uncompleted')
})

it("Update search input should dispatch update todo filters", () =>
{
    // Arrange
    const mockStore = configureStore()({ ...initialGlobalState })
    const expectedAction =
    { 
        type : TodoActions.UPDATE_TODO_FILTERS, 
        payload : { filters : { terms : 'Rire', onlyUncompleted : false } }
    }

    render(<Provider store={mockStore}>
        <TodoTableFilters/>
    </Provider>)

    const input = document.querySelectorAll('input')[0]

    // Act
    fireEvent.change(input, { target: { value: expectedAction.payload.filters.terms } })

    // Assert
    expect(mockStore.getActions()).toEqual([expectedAction])
})

it("Update search input should update it's value", () =>
{
    // Arrange
    const mockStore = configureStore()({ ...initialGlobalState })
    const terms : string = 'Rire'

    render(<Provider store={mockStore}>
        <TodoTableFilters/>
    </Provider>)

    const input = document.querySelectorAll('input')[0]

    // Act
    fireEvent.change(input, { target: { value: terms } })

    // Assert
    expect(input.value).toEqual(terms)
})

it("Check only completed todos should dispatch update todo filters", () =>
{
    // Arrange
    const mockStore = configureStore()({ ...initialGlobalState })
    const expectedAction =
    { 
        type : TodoActions.UPDATE_TODO_FILTERS, 
        payload : { filters : { terms : '', onlyUncompleted : true } }
    }

    render(<Provider store={mockStore}>
        <TodoTableFilters/>
    </Provider>)

    const checkbox = document.querySelectorAll('input')[1]

    // Act
    fireEvent.click(checkbox)

    // Assert
    expect(mockStore.getActions()).toEqual([expectedAction])
})

it("Check only completed todos should update it's value", () =>
{
    // Arrange
    const mockStore = configureStore()({ ...initialGlobalState })

    render(<Provider store={mockStore}>
        <TodoTableFilters/>
    </Provider>)

    const checkbox = document.querySelectorAll('input')[1]

    // Act
    fireEvent.click(checkbox)

    // Assert
    expect(checkbox.value).toEqual('on')
})