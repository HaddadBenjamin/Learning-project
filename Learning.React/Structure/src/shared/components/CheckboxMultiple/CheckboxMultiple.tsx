import React, {useEffect, useState} from "react";
import Checkbox from "../Checkbox/Checkbox";

interface Props
{
    checkboxes : CheckboxData[],
    onChange(checkedIds : string[]) : void,
    // in line / display / etcc ? classnames : example
}
interface CheckboxData
{
    id : string,
    label? : string,
    defaultChecked? : boolean,
    disabled? : boolean
}

const CheckboxMultiple = ({checkboxes, onChange} : Props) =>
{
    const [checkedIds, setCheckedIds] = useState<string[]>(checkboxes.filter(c => c.defaultChecked).map(c => c.id))

    useEffect(() => onChange(checkedIds), [checkedIds])

    const onCheckboxChange = (isChecked : boolean, id : string) =>
    {
        const containsId = checkedIds.includes(id);

        if (containsId && !isChecked)       setCheckedIds(checkedIds.filter(c => c != id))
        else if (!containsId && isChecked)  setCheckedIds([...checkedIds, id])
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