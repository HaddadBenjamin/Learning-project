import { Todo } from './Todo.model'
import { render } from '@testing-library/react'
import React, { Dispatch } from 'react'
import TodoRow from './TodoRow'
import { TodoActions } from './Todo.action'

describe("TodoRow", () =>
{
  it("Should be correctly mounted", () => {
        // Arrange
        const todoTitle : string = "faire la vaiselle"
        const todo : Todo = { id : "1", title : todoTitle, completed : false }
        const dispatch : Dispatch<TodoActions> = jest.fn() // Je vais rencontrer des problèmes car je n'ai pas monté un vrai redux ici.
    
        // Act
        render(<TodoRow todo={todo} dispatch={dispatch}/>)

        const trs : NodeListOf<HTMLTableRowElement> = document.querySelectorAll('tr')
        const tds : NodeListOf<HTMLTableDataCellElement> = trs[0].querySelectorAll('td')
        const todoCompletedCheckbox : HTMLInputElement = tds[0].querySelector('input[type="checkbox"]')
        const todoTitleInput : HTMLInputElement = tds[1].querySelector('input[type="text"]')

        const updateTodoButton : HTMLButtonElement = tds[2].querySelector('button')
        const updateTodoIcon : HTMLElement = updateTodoButton.querySelector('i')
        const updateTodoButtonStyle : CSSStyleDeclaration = window.getComputedStyle(updateTodoButton)

        const deleteTodoButton : HTMLButtonElement = tds[3].querySelector('button')
        const deleteTodoIcon : HTMLElement = deleteTodoButton.querySelector('i')

        // Assert
        expect(trs).toHaveLength(1)
        expect(tds).toHaveLength(4)

        expect(todoCompletedCheckbox.getAttribute('id')).toBe(`todo toggle ${todo.id}`)
        expect(todoCompletedCheckbox.value).toBe('on')

        expect(todoTitleInput.getAttribute('id')).toBe(`todo input ${todo.id}`)
        expect(todoTitleInput.getAttribute('value')).toBe(todoTitle)

        expect(updateTodoButton.className).toBe('btn btn-primary')
        expect(updateTodoButtonStyle.width).toBe('2.5rem')
        expect(updateTodoIcon.className).toBe('fas fa-edit')

        expect(deleteTodoButton.className).toBe('btn btn-danger')
        expect(deleteTodoIcon.className).toBe('fas fa-trash')
  })
})