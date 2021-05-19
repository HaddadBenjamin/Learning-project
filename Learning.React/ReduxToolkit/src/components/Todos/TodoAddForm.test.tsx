import { fireEvent, render } from '@testing-library/react'
import React from 'react'
import TodoAddForm from './TodoAddForm'
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { querySelectorWithThrow } from '../../shared/helpers/reactTestingLibaryHelpers'
import { TodoActions } from '../../domains/todos/todo.action'

it("Should be correctly mounted", () =>
{
    //Arrange
    const mockStore = configureStore()(undefined)

    // Act
    render(<Provider store={mockStore}>
      <TodoAddForm/>
    </Provider>)

    const forms : NodeListOf<HTMLFormElement> = document.querySelectorAll('form')
    const divs : NodeListOf<HTMLDivElement> = document.querySelectorAll('form > div')
    const button : HTMLButtonElement = querySelectorWithThrow(divs[0], 'button')
    const is : NodeListOf<HTMLElement> = button.querySelectorAll('i')
    const divsInsideDiv : HTMLDivElement = querySelectorWithThrow(divs[0], 'div')
    const input : HTMLInputElement = querySelectorWithThrow(divsInsideDiv, 'input')

    const divInsideDivStyle: CSSStyleDeclaration = window.getComputedStyle(divsInsideDiv)

    // Assert
    expect(forms).toHaveLength(1)
    expect(divs).toHaveLength(1)
    expect(is).toHaveLength(1)

    expect(divs[0].className).toBe('d-flex justify-content-between align-content-center')
    expect(button.className).toBe('btn btn-dark m-auto')
    expect(divsInsideDiv.className).toBe('form-group flex-grow-1 ml-2')

    expect(divInsideDivStyle.marginTop).toBe('-7.5px')
    expect(input.placeholder).toBe('title...')
})

it("Submit form should dispatch create todo action started", () =>
{
    //Arrange
    const mockStore = configureStore()(undefined)
    const expectedAction = { type : TodoActions.CREATE_TODO_STARTED, payload : { title: ''} }

    render(<Provider store={mockStore}>
      <TodoAddForm/>
    </Provider>)

    const form : HTMLFormElement = querySelectorWithThrow(document, 'form')

    // Act
    fireEvent.submit(form)

    // Assert
    expect(mockStore.getActions()).toEqual([expectedAction])
})

it("Click on add button should dispatch create todo action started", () =>
{
    //Arrange
    const mockStore = configureStore()(undefined)
    const expectedAction = { type : TodoActions.CREATE_TODO_STARTED, payload : { title: ''} }

    render(<Provider store={mockStore}>
      <TodoAddForm/>
    </Provider>)

    const button : HTMLButtonElement = querySelectorWithThrow(document, 'button')

    // Act
    fireEvent.click(button)

    // Assert
    expect(mockStore.getActions()).toEqual([expectedAction])
})

it("Update input text shoud update it's value", () =>
{
    //Arrange
    const mockStore = configureStore()(undefined)

    render(<Provider store={mockStore}>
      <TodoAddForm/>
    </Provider>)

    const input : HTMLInputElement = querySelectorWithThrow(document, 'input')
    const expectedInputValue : string = 'Faire les courses'

    // Act
    fireEvent.change(input, { target: { value: expectedInputValue } })

    // Assert
    expect(input.value).toBe(expectedInputValue)
})