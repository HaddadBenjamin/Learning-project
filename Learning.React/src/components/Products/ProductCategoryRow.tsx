import Product from "./Product"
import React from "react"

interface Props
{
    product : Product
}

const ProductCategoryRow = React.memo<Props>(({product}) =>
{
    return <tr>
        <th colSpan={2}>{product.category}</th>
    </tr>
})

export default ProductCategoryRow