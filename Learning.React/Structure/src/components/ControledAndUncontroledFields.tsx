import React, { useRef, useState } from 'react';

const ControledAndUncontroledFields = () =>
{
    const [controledField, setControledField] = useState<string>('champs contrôlé')
    const [uncontroledField, setUncontroledField] = useState<string>('champs incontrôlé')
    const uncontroledInputRef : any = useRef(null)

    const handleOnChange = (event : React.ChangeEvent<HTMLInputElement>) => setControledField(event.target.value)
    const handleOnSubmit = () => setUncontroledField(uncontroledInputRef.current.value)
    
    return (
        <>
            <br/><br/>
            <h2>Les champs contrôlés et incontrôlés</h2>
            <label>{controledField}</label>
            <input type="text" value={controledField} onChange={handleOnChange}></input>

            <br/><br/>
            <label>{uncontroledField}</label>
            <input type="text" ref={uncontroledInputRef} />
            <button onClick={handleOnSubmit}>Mettre à jour votre champs incontrolé</button>
        </>
    );
}

export default ControledAndUncontroledFields;