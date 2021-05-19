import { ITodo } from '../../domains/todos/todo.model'
import { fireEvent, render } from '@testing-library/react'
import React from 'react'
import TodoRow from './TodoRow'
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { querySelectorWithThrow } from '../../shared/helpers/reactTestingLibaryHelpers'
import { TodoActions } from '../../domains/todos/todo.action'
import { newGuid } from '../../shared/helpers/stringHelpers'

it("Should be correctly mounted", () =>
{
        // Arrange
        const expectedTodoTitle : string = "faire la vaiselle"
        const todo : ITodo = { id : "1", title : expectedTodoTitle, completed : false }
        const mockStore = configureStore()(undefined)

        // Act
        render(<Provider store={mockStore}>
            <table>
            <tbody>
                <TodoRow todo={todo}/>
            </tbody>
        </table>
        </Provider>)

        const tr : HTMLTableRowElement = querySelectorWithThrow(document, 'tr')
        const tds : NodeListOf<HTMLTableDataCellElement> = tr.querySelectorAll('td')
        const todoCompletedCheckbox : HTMLInputElement = tds[0].querySelector('input[type="checkbox"]') as HTMLInputElement
        const todoTitleInput : HTMLInputElement = tds[1].querySelector('input[type="text"]') as HTMLInputElement

        const updateTodoButton : HTMLButtonElement = querySelectorWithThrow(tds[2], 'button')
        const updateTodoIcon = querySelectorWithThrow(updateTodoButton, 'i')
        const updateTodoButtonStyle : CSSStyleDeclaration = window.getComputedStyle(updateTodoButton)

        const deleteTodoButton : HTMLButtonElement = querySelectorWithThrow(tds[3], 'button')
        const deleteTodoIcon : HTMLElement = querySelectorWithThrow(deleteTodoButton, 'i')

        // Assert
        expect(tds).toHaveLength(4)

        expect(todoCompletedCheckbox.getAttribute('id')).toBe(`todo toggle ${todo.id}`)
        expect(todoCompletedCheckbox.value).toBe('on')

        expect(todoTitleInput.getAttribute('id')).toBe(`todo input ${todo.id}`)
        expect(todoTitleInput.getAttribute('value')).toBe(expectedTodoTitle)

        expect(updateTodoButton.className).toBe('btn btn-primary')
        expect(updateTodoButtonStyle.width).toBe('2.5rem')
        expect(updateTodoIcon.className).toBe('fas fa-edit')

        expect(deleteTodoButton.className).toBe('btn btn-danger')
        expect(deleteTodoIcon.className).toBe('fas fa-trash')
})

it("Check on completed should dispatch toggle todo", () =>
{
    //Arrange
    const mockStore = configureStore()(undefined)
    const todo : ITodo = { id : newGuid(), completed : false, title : 'Faire les courses' }
    const expectedAction = { type : TodoActions.TOGGLE_TODO_STARTED, payload : { id: todo.id } }

    render(<Provider store={mockStore}>
        <table>
            <tbody>
                <TodoRow todo={todo}/>
            </tbody>
        </table>
    </Provider>)

    const checkbox : HTMLInputElement = document.querySelectorAll('input[type="checkbox"]')[0] as HTMLInputElement

    // Act
    fireEvent.click(checkbox)

    // Assert
    expect(mockStore.getActions()).toEqual([expectedAction])
})

it("Update input text should update it's value", () =>
{
    //Arrange
    const mockStore = configureStore()(undefined)
    const todo : ITodo = { id : newGuid(), completed : false, title : 'Faire les courses' }

    render(<Provider store={mockStore}>
        <table>
            <tbody>
                <TodoRow todo={todo}/>
            </tbody>
        </table>
    </Provider>)

    const input : HTMLInputElement = document.querySelectorAll('input[type="text"]')[0] as HTMLInputElement

    // Assert
    expect(input.value).toEqual(todo.title)
})

it("Click on publish should dispatch update todo", () =>
{
    //Arrange
    const mockStore = configureStore()(undefined)
    const todo : ITodo = { id : newGuid(), completed : false, title : 'Faire les courses' }
    const newTodoTitle : string = 'Faire boire les chèvres'
    const expectedAction = { type : TodoActions.UPDATE_TODO_STARTED, payload : { id: todo.id, newTitle : newTodoTitle } }

    render(<Provider store={mockStore}>
        <table>
            <tbody>
                <TodoRow todo={todo}/>
            </tbody>
        </table>
    </Provider>)

    const button : HTMLButtonElement = querySelectorWithThrow(document, 'button')
    const input : HTMLInputElement = document.querySelectorAll('input[type="text"]')[0] as HTMLInputElement

    // Act
    fireEvent.change(input, { target: { value: newTodoTitle } })
    fireEvent.click(button)

    // Assert
    expect(mockStore.getActions()).toEqual([expectedAction])
})

it("Click on delete should dispatch delete todo", () =>
{
    //Arrange
    const mockStore = configureStore()(undefined)
    const todo : ITodo = { id : newGuid(), completed : false, title : 'Faire les courses' }
    const expectedAction = { type : TodoActions.DELETE_TODO_STARTED, payload : { id: todo.id } }

    render(<Provider store={mockStore}>
        <table>
            <tbody>
                <TodoRow todo={todo}/>
            </tbody>
        </table>
    </Provider>)

    const button : HTMLButtonElement = document.querySelectorAll('button')[1] as HTMLButtonElement

    // Act
    fireEvent.click(button)

    // Assert
    expect(mockStore.getActions()).toEqual([expectedAction])
})