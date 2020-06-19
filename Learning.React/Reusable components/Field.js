const Field = React.memo(function({name, value = undefined, onChange = () => {}, children = undefined, placeholder = undefined})
{
    return <div className="form-group">
        <label htmlFor={name}>{children}</label>
        <input type="text" value={value} placeholder={placeholder} onChange={onChange} id={name} name={name} className="form-control"></input>
    </div>
})