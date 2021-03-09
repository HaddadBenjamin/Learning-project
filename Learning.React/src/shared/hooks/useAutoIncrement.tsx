import useIncrement from './useIncrement'
import {useEffect} from 'react'

const useAutoIncrement  = (initialValue : number = 0, step : number = 1) =>
{
    const [value, increment] = useIncrement(initialValue, step)

    useEffect(() =>
    {
        const timer = window.setInterval(increment, 1000)

        return () => clearInterval(timer)
    }, [increment])

    return value
}

export default useAutoIncrement