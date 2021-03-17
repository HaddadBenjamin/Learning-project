import {useState} from 'react'

const useIncrement = (initialValue : number = 0, step : number = 1) =>
{
    const [value, setValue] = useState<number>(initialValue)
    const increment = () => setValue(value + step)

    return { value, increment } as const
}

export default useIncrement