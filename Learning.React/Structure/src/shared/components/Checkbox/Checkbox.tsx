import React from "react";

interface Props
{
    id : string,
    onChange(isChecked : boolean, id : string) : void,
    label? : string,
    defaultChecked? : boolean,
    disabled? : boolean
}

const Checkbox = React.memo(({id, onChange, defaultChecked, label, disabled} : Props) =>
{
    const onCheckedChange = (event : React.ChangeEvent<HTMLInputElement>) =>
    {
        onChange(event.target.checked, id)
    }

    return <div className="form-check">
        <input
            type="checkbox"
            defaultChecked={defaultChecked}
            onChange={onCheckedChange}
            id={id}
            name={id}
            disabled={disabled}
            className="form-check-label"/>
        <label
            htmlFor={id}
            className="form-check-label ml-1">{label}</label>
    </div>
})

export default Checkbox