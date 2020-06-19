import React from "react";

interface Props
{
    id : string,
    onChange(isChecked : boolean) : void,
    label? : string,
    defaultChecked? : boolean,
}

const Checkbox = ({id, onChange, defaultChecked, label} : Props) =>
{
    const onCheckedChange = (event : React.ChangeEvent<HTMLInputElement>) =>
    {
        console.log(event.target.checked)
        onChange(event.target.checked)
    }

    return <div className="form-check">
        <input
            type="checkbox"
            defaultChecked={defaultChecked}
            onChange={onCheckedChange}
            id={id}
            name={id}
            className="form-check-label"/>
        <label
            htmlFor={id}
            className="form-check-label ml-1">{label}</label>
    </div>
}

export default Checkbox