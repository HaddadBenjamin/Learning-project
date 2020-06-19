const Checkbox = React.memo(function({name, checked = false, onChange = () => {}, children = undefined})
{
    return <div className="form-check">
        <input type="checkbox" checked={checked} onChange={onChange} id={name} name={name} className="form-check-label"></input>
        <label htmlFor={name} className="form-check-label ml-1">{children}</label>
    </div>
})