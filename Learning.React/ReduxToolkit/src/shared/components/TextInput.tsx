import React from 'react'

interface Props
{
    id : string
    onChange(value : string, id : string) : void
    defaultValue? : string
    value? : string
    label? : string
    placeholder? : string
    disabled? : boolean
    classes? : string
}

const TextInput = (
{
    id, 
    onChange, 
    value, 
    defaultValue, 
    label = '', 
    placeholder = '', 
    disabled = false, 
    classes = ''
} : Props) =>
{
    const onValueChange = (event : React.ChangeEvent<HTMLInputElement>) =>
    {
        onChange(event.target.value, id)
    }

    return <div className={`form-group ${classes}`.trim()} style={{marginTop : '-7.5px'}}>
        <label htmlFor={id}>{label}</label>
        <input
            type="text"
            value={value}
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