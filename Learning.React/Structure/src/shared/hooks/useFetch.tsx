import React, {useEffect, useState} from "react"

const useFetch = function<T>(url : string)
{
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [items, setItems] = useState<T[]>([])
    const [error, setError] = useState<string>('')

    useEffect(() =>
    {
        async function asyncUseEffect()
        {
            await fetch(url)
                .then(async (response) =>
                {
                    if (!response.ok)
                        throw new Error(`${response.status} : ${response.statusText}`)
                    else
                        setItems(await response.json())
                })
                .catch((error) => setError(error.message))

            setIsLoading(false)
        }
        asyncUseEffect();
    }, [])

    return [items, isLoading, error]
}

export default useFetch