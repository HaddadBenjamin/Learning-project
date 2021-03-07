import { ITodoFilters } from './todo.model'
import { render } from '@testing-library/react'
import React from 'react'
import TodoTableFilters from './TodoTableFilters'
import { IGlobalState, initialGlobalState } from '../../rootReducer'
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux'

describe("TodoTableFilters", () =>
{
  it("Should be correctly mounted", () => {
        // Arrange
        const filters : ITodoFilters = { terms : '', onlyUncompleted : true }
        let globalState : IGlobalState = initialGlobalState
        globalState.todos.filters = filters
        const mockStore = configureStore()(globalState)
        
        // Act
        render(<Provider store={mockStore}>
          <TodoTableFilters/>
        </Provider>)

        const divs : NodeListOf<HTMLDivElement> = document.querySelectorAll('div')
        const inputSearchInput : HTMLInputElement | null = divs[1].querySelector('input')
        const checkboxInput : HTMLInputElement | null = divs[2].querySelector('input')
        const checkboxLabel : HTMLLabelElement | null = divs[2].querySelector('label')

        const firstDivStyle : CSSStyleDeclaration = window.getComputedStyle(divs[1])
        
        // Assert
        expect(divs).toHaveLength(3)

        expect(divs[1].className).toBe('form-group')
        expect(firstDivStyle.marginTop).toBe('-7.5px')

        expect(inputSearchInput?.placeholder).toBe("Search...")
        expect(inputSearchInput?.className).toBe("form-control")

        expect(divs[2].className).toBe('form-check')
        expect(checkboxInput?.className).toBe('form-check-label')
        expect(checkboxLabel?.className).toBe('form-check-label ml-1')
        expect(checkboxLabel?.textContent).toBe('Only uncompleted')
  })
})

// To do test all events & behaviours