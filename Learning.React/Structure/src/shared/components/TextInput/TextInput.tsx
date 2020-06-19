import React from "react";

interface Props
{
    id : string,
    onChange(value : string) : void,
    defaultValue? : string,
    label? : string,
    placeholder? : string
}

const TextInput = ({id, onChange, defaultValue, label, placeholder} : Props) =>
{
    const onValueChange = (event : React.ChangeEvent<HTMLInputElement>) =>
    {
        onChange(event.target.value);
    }

    return <div className="form-group">
        <label htmlFor={id}>{label}</label>
        <input
            type="text"
            defaultValue={defaultValue || ''}
            placeholder={placeholder}
            onChange={onValueChange}
            id={id}
            name={id}
            className="form-control"/>
    </div>
}

export default TextInput