import useIncrement from './useIncrement'
import {useEffect} from 'react'

const useAutoIncrement  = (initialValue : number = 0, step : number = 1, delay : number = 1000) =>
{
    const { value, increment } = useIncrement(initialValue, step)

    useEffect(() =>
    {
        const timer = window.setInterval(increment, delay)

        return () => clearInterval(timer)
    }, [increment])

    return value
}

export default useAutoIncrement