import Product from "./Product";
import React from "react";

interface Props
{
    product : Product
}

const ProductRow = ({product} : Props) =>
{
    const nameClasses = product.stocked ? '' : 'text-danger';

    return <tr>
        <td className={nameClasses}>{product.name}</td>
        <td>{product.price}</td>
    </tr>
}

export default ProductRow