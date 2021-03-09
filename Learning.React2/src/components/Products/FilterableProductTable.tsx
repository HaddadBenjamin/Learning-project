import React, {useState} from 'react'
import {ProductFilters} from "./ProductFilters"
import Product, {PRODUCTS} from "./Product"
import ProductTable from "./ProductTable"
import ProductTableFilters from "./ProductTableFilters"
import './Global.scss'

const FilterableProductTable = () =>
{
    const [products] = useState<Product[]>(PRODUCTS)
    const [filteredProducts, setFilteredProducts] = useState<Product[]>(PRODUCTS)

    const onFiltersChange = (filters : ProductFilters) =>
    {
        const {inStockOnly, filterText} = filters

        setFilteredProducts(products.filter(p => (!inStockOnly || p.stocked) && p.name.includes(filterText)))
    }

    return <>
        <h2>Structurer ses composants</h2>
        <div className="container col-4">
            <ProductTableFilters onFiltersChange={onFiltersChange}/>
            <ProductTable products={filteredProducts}/>
        </div>
    </>
}

export default FilterableProductTable
