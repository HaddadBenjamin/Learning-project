import React from "react";

interface Props
{
    id : string,
    onChange(value : string, id : string) : void,
    defaultValue? : string,
    label? : string,
    placeholder? : string,
    disabled? : boolean
}

const TextInput = ({id, onChange, defaultValue, label, placeholder, disabled} : Props) =>
{
    const onValueChange = (event : React.ChangeEvent<HTMLInputElement>) =>
    {
        onChange(event.target.value, id);
    }

    return <div className="form-group">
        <label htmlFor={id}>{label}</label>
        <input
            type="text"
            defaultValue={defaultValue}
            placeholder={placeholder}
            onChange={onValueChange}
            disabled={disabled}
            id={id}
            name={id}
            className="form-control"/>
    </div>
}

export default TextInput