import React from 'react'
import useCounter from '../shared/hooks/useCounter'

interface Props
{
    initialValue? : number
    step? : number
}

const Counter = ({initialValue = 0, step = 1} : Props) =>
{
    const [value, increment, decrement] = useCounter(initialValue, step)

    return (
        <>
            <h2>Les fonctions & les customs hooks</h2>
            <div style={{backgroundColor : 'red'}}>{value}</div>
            <div>{step}</div>
            <button onClick={increment}>Increment</button>
            <button onClick={decrement}>Decrement</button>
        </>
    );
}

export default Counter