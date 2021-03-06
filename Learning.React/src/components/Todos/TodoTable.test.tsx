import { Todo } from './Todo.model'
import { render } from '@testing-library/react'
import React, { Dispatch } from 'react'
import TodoTable from './TodoTable'
import { TodoActions } from './Todo.action'

describe("TodoTable", () =>
{
  it("Should be correctly mounted", () => {
        // Arrange
        const todos : Todo[] = [
            { id : "1", title : "faire la vaiselle", completed : false },
            { id : "2", title : "acheter du poisson", completed : true }
        ]
        const dispatch : Dispatch<TodoActions> = jest.fn()
    
        // Act
        render(<TodoTable todos={todos} dispatch={dispatch}/>)

        const tables : NodeListOf<HTMLTableElement> = document.querySelectorAll('table')
        const table : HTMLTableElement = tables[0]
        const theads : NodeListOf<HTMLTableSectionElement> = table.querySelectorAll('thead')
        const trs : NodeListOf<HTMLTableRowElement> = theads[0].querySelectorAll('tr')
        const ths : NodeListOf<HTMLTableHeaderCellElement> = trs[0].querySelectorAll('th')
        const tbody : NodeListOf<HTMLTableSectionElement> = table.querySelectorAll('tbody')
        const trsInsideTbody : NodeListOf<HTMLTableRowElement> = tbody[0].querySelectorAll('tr')

        // Assert
        expect(tables).toHaveLength(1)
        expect(theads).toHaveLength(1)
        expect(trs).toHaveLength(1)
        expect(ths).toHaveLength(4)
        expect(tbody).toHaveLength(1)
        expect(trsInsideTbody).toHaveLength(2)

        expect(table.className).toBe('table table-dark table-striped')

        expect(ths[0].textContent).toBe('Completed')
        expect(ths[1].textContent).toBe('Title')
        expect(ths[2].textContent).toBe('Publish edition')
        expect(ths[3].textContent).toBe('Remove')
  })
})