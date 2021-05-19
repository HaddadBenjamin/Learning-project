import React from 'react'

interface Props
{
    id : string
    onChange(isChecked : boolean, id : string) : void
    label? : string
    defaultChecked? : boolean
    checked? : boolean
    disabled? : boolean
    className? : string
}

const Checkbox = React.memo((
{
    id,
    onChange,
    label = '',
    defaultChecked,
    disabled,
    checked, 
    className = ''
} : Props) =>
{
    const onCheckedChange = (event : React.ChangeEvent<HTMLInputElement>) =>
    {
        onChange(checked === undefined ? event.target.checked : !checked, id)
    }

    return <div className={`form-check ${className}`.trim()}>
        <input
            type="checkbox"
            defaultChecked={defaultChecked}
            checked={checked}
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