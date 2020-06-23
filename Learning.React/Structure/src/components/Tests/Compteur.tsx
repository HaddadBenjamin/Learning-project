import React from "react"
import useIncrement from "../../shared/hooks/useIncrement";

const Compteur = () =>
{
    const [value, increment] = useIncrement()

    return <>
        <button onClick={increment}>Incrémenter la valeur : </button>
        {value}
    </>
}

export default Compteur