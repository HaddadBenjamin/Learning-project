import { useEffect, useState } from "react";

const useInfiniteScroll = (getItems : any, updateDelay : number = 250) =>
{
    const [isFetching, setIsFetching] = useState<boolean>(false)

    useEffect(() =>
    {
        getItems()

        const timer = window.setInterval(computeIsFetching, updateDelay)

        return () => clearInterval(timer)
    }, [])
  
    useEffect(() =>
    {
        if (!isFetching) return
       
        async function asyncEffect()
        {
            setIsFetching(true)
            await getItems()
            setIsFetching(false)
        }
        
        asyncEffect()
    }, [isFetching])
  
    function computeIsFetching()
    {
        // Il faudrait plutôt que l'utilisateur se trouve en bas des éléments à scroller.
        if (window.innerHeight + document.documentElement.scrollTop <
            document.documentElement.offsetHeight || isFetching)
            return
        
        setIsFetching(true)
    }
  
    return [isFetching, setIsFetching]
};

export default useInfiniteScroll