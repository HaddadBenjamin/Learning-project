// Pourquoi je m'ennuis à recoder tout ça ? Cette librairie offre déjà tous ces composants et ils sont superbes : https://material-ui.com/components/radio-buttons/
// Dans une vraie application, il serait encore plus intéressant de payer une lib front avec des composants React déjà présents.
import React from 'react'

export interface RadioButtonData
{
    label : string
    value : string
    id : string
    disabled? : boolean
    checked? : boolean
}

interface Props
{
    radios : RadioButtonData[]
    onChange(value : boolean, id : string) : void
    className? : string
}

const RadioButtons = (
{
    radios,
    onChange,
    className = ''
} : Props) =>
{
    const onRadioChange = (event :  React.ChangeEvent<HTMLInputElement>) =>
    {
        const value = event.target.checked
        const id = (radios.find(r => r.value) as RadioButtonData).id

        onChange(value, id)
    }

    return <div onChange={onRadioChange}>
        {
            radios.map(r =>
                <div className={`form-check ${className}`.trim()} key={r.id}>
                    <input
                        id={r.id}
                        type="radio"
                        name={radios[0].id}
                        disabled={r.disabled}/>
                    <label
                        htmlFor={r.id}
                        className="radio-inline ml-1">{r.label}</label>
                </div>)
        }
    </div>
}

export default RadioButtons