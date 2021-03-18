import React, { useRef, useState } from 'react'

const ControledAndUncontroledFields = () =>
{
    const [controledField, setControledField] = useState<string>('Champ contrôlé')
    const [uncontroledField, setUncontroledField] = useState<string>('Champ incontrôlé')
    const uncontroledInputRef : any = useRef(null)

    const handleOnChange = (event : React.ChangeEvent<HTMLInputElement>) => setControledField(event.target.value)
    const handleOnSubmit = () => setUncontroledField(uncontroledInputRef.current.value)
    
    return <>
        <br/><br/>
        <h2>Les champs contrôlés et incontrôlés</h2>
        <label>{controledField}</label>
        <br></br>
        <input type="text" value={controledField} onChange={handleOnChange}></input>

        <br/><br/>
        <label>{uncontroledField}</label>
        <br></br>
        <input type="text" ref={uncontroledInputRef} />
        <button onClick={handleOnSubmit} className="ml-2">Mettre à jour votre le champ incontrolé</button>
    </>
}

export default ControledAndUncontroledFields