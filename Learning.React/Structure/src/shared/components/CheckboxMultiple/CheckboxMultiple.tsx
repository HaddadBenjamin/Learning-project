import React, {useEffect, useState} from "react";
import Checkbox from "../Checkbox/Checkbox";

interface Props
{
    checkboxes : CheckboxData[],
    onChange(checkedIds : string[]) : void,
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
    const [checkedIds, setCheckedIds] = useState<string[]>(checkboxes.filter(c => c.defaultChecked).map(c => c.id))

    const onCheckboxChange = (isChecked : boolean, id : string) =>
    {
        const containsId = checkedIds.includes(id);
        const newCheckedIds =
            containsId && !isChecked ? checkedIds.filter(c => c != id) :
            !containsId && isChecked ? [...checkedIds, id] :
            checkedIds;

        onChange(newCheckedIds)
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