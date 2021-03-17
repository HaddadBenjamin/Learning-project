import { useState } from 'react'

const useCounter = (initialValue : number = 0, step : number = 1) =>
{
    const [value, setValue] = useState<number>(initialValue)

    const increment = () => setValue(value + step)
    const decrement = () => setValue(value - step)

    return { value, increment, decrement } as const
}

export default useCounter