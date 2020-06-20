import React from "react";
import Checkbox from "../Checkbox/Checkbox";

interface Props
{
    checkboxes : CheckboxData[]
    onChange(checkboxes : CheckboxData[]) : void
    checkboxClassName? : string
    // Pour ne pouvoir sélectionner qu'un seul élément à la fois, regarder mon composant ToggleGroup
}
export interface CheckboxData
{
    id : string
    label? : string
    defaultChecked? : boolean
    checked? : boolean
    disabled? : boolean
}

const CheckboxMultiple = ({checkboxes, onChange, checkboxClassName} : Props) =>
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