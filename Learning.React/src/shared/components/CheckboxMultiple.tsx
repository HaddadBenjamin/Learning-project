import React from 'react'
import Checkbox from './Checkbox'

interface Props
{
    checkboxes : CheckboxData[]
    onChange(checkboxes : CheckboxData[]) : void
    checkboxClassName? : string
    // Si vous avez besoin d'utiliser qu'un seul composant à la fois, vous pouvez utiliser mon composant RadioButtons.
}
export interface CheckboxData
{
    id : string
    label? : string
    defaultChecked? : boolean
    checked? : boolean
    disabled? : boolean
}

const CheckboxMultiple = (
{
    checkboxes,
    onChange,
    checkboxClassName = ''
} : Props) =>
{
    const onCheckboxChange = (isChecked : boolean, id : string) =>
    {
        const checkboxIndex = checkboxes.findIndex(c => c.id === id)
        let newCheckboxes = [...checkboxes]

        newCheckboxes[checkboxIndex].checked = isChecked

        onChange(newCheckboxes)
    }

    return <>
        {checkboxes.map(c => <Checkbox
            key={c.id}
            id={c.id}
            onChange={onCheckboxChange}
            label={c.label}
            checked={c.checked}
            defaultChecked={c.defaultChecked}
            className={checkboxClassName}
            disabled={c.disabled}/>)}
    </>
}

export default CheckboxMultiple