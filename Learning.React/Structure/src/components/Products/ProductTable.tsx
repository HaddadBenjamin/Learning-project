import Product from "./Product"
import ProductCategoryRow from "./ProductCategoryRow"
import React from "react"
import ProductRow from "./ProductRow"

interface ProductTableProps
{
    products : Product[]
}

const ProductTable = ({products} : ProductTableProps) =>
{
    const getProductRows = () : any[] =>
    {
        let lastCategory : string = ''
        let rows : any[] = []

        products.forEach(p =>
        {
            if (lastCategory !== p.category)
            {
                lastCategory = p.category
                rows.push(<ProductCategoryRow key={p.category} product={p}/>)
            }
            
            rows.push(<ProductRow key={p.name} product={p}/>)
        })

        return rows
    }

    return <div>
        <table className="table table-dark table-striped mt-4">
            <thead>
            <tr>
                <th>Name</th>
                <th>Price</th>
            </tr>
            </thead>
            <tbody>{getProductRows()}</tbody>
        </table>
    </div>
}

export default ProductTable