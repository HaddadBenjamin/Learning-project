import { useEffect, useState } from "react";

const useInfiniteScroll = (getItems : () => Promise<any>, containerId : string = '', updateDelay : number = 250) =>
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
        const userVerticalPosition : number = window.innerHeight + document.documentElement.scrollTop
        const pageHeight : number = document.documentElement.offsetHeight
        
        if (isFetching) return
        if (containerId !== '')
        {
            const itemElements : HTMLCollection = (document.getElementById(containerId) as HTMLElement).children
            const lastItemElement : Element = itemElements[itemElements.length - 1] as Element
            if (lastItemElement !== undefined)
            {
                const lastItemElementRect : DOMRect = lastItemElement.getBoundingClientRect()
                const bodyRect : DOMRect = document.body.getBoundingClientRect()
                const lastElementVerticalPosition : number = lastItemElementRect.bottom - bodyRect.top
                
                if (userVerticalPosition < lastElementVerticalPosition) return
            }
        }
        else if (userVerticalPosition < pageHeight) return
        
        setIsFetching(true)
    }
  
    return [isFetching, setIsFetching]
};

export default useInfiniteScroll