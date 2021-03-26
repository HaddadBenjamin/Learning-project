import React, { useState } from "react"
import axios from "axios"
import useInfiniteScroll from '../shared/hooks/useInfiniteScroll'

// C'est une alternative à la pagination.
const InfiniteScrolling = () =>
{
    // Votre API doit renvoyer l'information qu'il éxiste ou non une prochaine page.
    const lastPage : number = 100
    const pageSize : number = 1
  
    const getItems = () : Promise<any> =>
    {
        if (!hasNextPage) return Promise.resolve()
        
        return axios
            .get(`https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=${pageSize}`)
            .then(response =>
            {
                const newPage : number = page + 1

                setItems([...items, ...response.data])
                setPage(newPage)

                if (newPage > lastPage)
                    setHasNextPage(false)
            })
    }

    const [items, setItems] = useState<any[]>([])
    const [isFetching] = useInfiniteScroll(getItems, 'infiniteScrollContainerId')
    const [page, setPage] = useState<number>(1)
    const [hasNextPage, setHasNextPage] = useState<boolean>(true)

    return <>
        <h2>Infinite scrolling</h2>
        
        <div id='infiniteScrollContainerId'>
            {items.map(item => <img key={item.id} src={item.url} height="100px" width="200px" />)}
            {isFetching && <span>Loading...</span> }
        </div>
    </>
}

export default InfiniteScrolling