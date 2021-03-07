import { render } from '@testing-library/react'
import React from 'react'
import TodoAddForm from './TodoAddForm'
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux'

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
        const buttons : NodeListOf<HTMLButtonElement> = divs[0].querySelectorAll('button')
        const is : NodeListOf<HTMLElement> = buttons[0].querySelectorAll('i')
        const divsInsideDivs : NodeListOf<HTMLDivElement> = divs[0].querySelectorAll('div')
        const inputs : NodeListOf<HTMLInputElement> = divsInsideDivs[0].querySelectorAll('input')

        const divInsideDivStyle: CSSStyleDeclaration = window.getComputedStyle(divsInsideDivs[0])

        // Assert
        expect(forms).toHaveLength(1)
        expect(divs).toHaveLength(1)
        expect(buttons).toHaveLength(1)
        expect(is).toHaveLength(1)
        expect(inputs).toHaveLength(1)

        expect(divs[0].className).toBe('d-flex justify-content-between align-content-center')
        expect(buttons[0].className).toBe('btn btn-dark m-auto')
        expect(divsInsideDivs[0].className).toBe('form-group flex-grow-1 ml-2')

        expect(divInsideDivStyle.marginTop).toBe('-7.5px')
        expect(inputs[0].placeholder).toBe('title...')
  })
})

// To do : test differnet user behaviour