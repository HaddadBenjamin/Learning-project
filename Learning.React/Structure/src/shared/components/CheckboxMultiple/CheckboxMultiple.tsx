import React from "react";
import Checkbox from "../Checkbox/Checkbox";

interface Props
{
    checkboxes : CheckboxData[],
    onChange(checkboxes : CheckboxData[]) : void,
    // in line / display / etcc ? classnames : example
}
export interface CheckboxData
{
    id : string,
    label? : string,
    defaultChecked? : boolean,
    disabled? : boolean
}

const CheckboxMultiple = ({checkboxes, onChange} : Props) =>
{
    const onCheckboxChange = (isChecked : boolean, id : string) =>
    {
        const checkboxIndex = checkboxes.findIndex(c => c.id == id)
        let newCheckboxes = [...checkboxes]

        newCheckboxes[checkboxIndex].defaultChecked = isChecked

        onChange(newCheckboxes)
    }

    return <>
        {checkboxes.map(c => <Checkbox
            key={c.id}
            id={c.id}
            onChange={onCheckboxChange}
            label={c.label}
            defaultChecked={c.defaultChecked}
            disabled={c.disabled}/>)}
    </>
}

export default CheckboxMultiple