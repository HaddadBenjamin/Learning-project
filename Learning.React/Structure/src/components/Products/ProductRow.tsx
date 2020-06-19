import Product from "./Product";
import React from "react";

interface Props
{
    product : Product
}

const ProductRow = React.memo(({product} : Props) =>
{
    console.log('render')
    const nameClasses = product.stocked ? '' : 'text-danger';

    return <tr>
        <td className={nameClasses}>{product.name}</td>
        <td>{product.price}</td>
    </tr>
})

export default ProductRow