import Product from "./Product";
import React from "react";

interface Props
{
    product : Product
}

const ProductRow = React.memo<Props>(({product}) =>
{
    console.log('render')
    return <tr>
        <td className={product.stocked ? '' : 'text-danger'}>{product.name}</td>
        <td>{product.price}</td>
    </tr>
})

export default ProductRow