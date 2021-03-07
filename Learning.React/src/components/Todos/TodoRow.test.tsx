import { Todo } from './todo.model'
import { render } from '@testing-library/react'
import React from 'react'
import TodoRow from './TodoRow'
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux'

describe("TodoRow", () =>
{
  it("Should be correctly mounted", () => {
        // Arrange
        const todoTitle : string = "faire la vaiselle"
        const todo : Todo = { id : "1", title : todoTitle, completed : false }
        const mockStore = configureStore()(undefined)

        // Act
        render(<Provider store={mockStore}>
            <table>
              <tbody>
                  <TodoRow todo={todo}/>
              </tbody>
          </table>
        </Provider>)

        const trs : NodeListOf<HTMLTableRowElement> = document.querySelectorAll('tr')
        const tds : NodeListOf<HTMLTableDataCellElement> = trs[0].querySelectorAll('td')
        const todoCompletedCheckbox : HTMLInputElement | null = tds[0].querySelector('input[type="checkbox"]')
        const todoTitleInput : HTMLInputElement | null = tds[1].querySelector('input[type="text"]')

        const updateTodoButton : HTMLButtonElement | null = tds[2].querySelector('button')
        const updateTodoIcon = updateTodoButton?.querySelector('i')
        const updateTodoButtonStyle : CSSStyleDeclaration | null = updateTodoButton != null ? window.getComputedStyle(updateTodoButton) : null

        const deleteTodoButton : HTMLButtonElement | null = tds[3].querySelector('button')
        const deleteTodoIcon : HTMLElement | null | undefined = deleteTodoButton?.querySelector('i')

        // Assert
        expect(trs).toHaveLength(1)
        expect(tds).toHaveLength(4)

        expect(todoCompletedCheckbox?.getAttribute('id')).toBe(`todo toggle ${todo.id}`)
        expect(todoCompletedCheckbox?.value).toBe('on')

        expect(todoTitleInput?.getAttribute('id')).toBe(`todo input ${todo.id}`)
        expect(todoTitleInput?.getAttribute('value')).toBe(todoTitle)

        expect(updateTodoButton?.className).toBe('btn btn-primary')
        expect(updateTodoButtonStyle?.width).toBe('2.5rem')
        expect(updateTodoIcon?.className).toBe('fas fa-edit')

        expect(deleteTodoButton?.className).toBe('btn btn-danger')
        expect(deleteTodoIcon?.className).toBe('fas fa-trash')
  })
})

// To do test all events & behaviours