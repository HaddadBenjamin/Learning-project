import React from 'react'
import useCounter from '../shared/hooks/useCounter'

interface Props
{
    initialValue? : number
    step? : number
}

const Counter = ({initialValue = 0, step = 3} : Props) =>
{
    const { value, increment, decrement } = useCounter(initialValue, step)

    return <>
        <h2>Les fonctions & les customs hooks</h2>
        <div>Value : <span style={{fontWeight : 'bold', color : 'red'}}>{value}</span></div>
        <div>Step : {step}</div>
        <button onClick={increment} className="mt-2">Increment</button>
        <button onClick={decrement} className="ml-2">Decrement</button>
    </>
}

export default Counter