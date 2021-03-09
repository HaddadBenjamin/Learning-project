import { render } from '@testing-library/react'
import React from 'react'
import TodoAddForm from './TodoAddForm'
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { querySelectorWithThrow } from '../../shared/helpers/reactTestingLibaryHelpers'

describe("TodoAddForm", () =>
{
  it("Should be correctly mounted", () => {
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
})

// To do : test differnet user behaviour