import {ProductFilters} from "./ProductFilters"
import React, {useEffect, useState} from "react"
import TextInput from "../../shared/components/TextInput"
import Checkbox from "../../shared/components/Checkbox"

interface Props
{
    onFiltersChange(filters : ProductFilters) : void
}

const ProductTableFilters = React.memo(({onFiltersChange} : Props) =>
{
    const [inStockOnly, setInStockOnly] = useState<boolean>(false)
    const [filterText, setFilterText] = useState<string>('')

    useEffect(() => onFiltersChange(
    {
        inStockOnly : inStockOnly,
        filterText : filterText
    }), [inStockOnly, filterText])

    const onFilterTextChange = (filterText : string, id :string) =>
    {
        setFilterText(filterText)
    }

    const onInStockOnlyChange = (stockOnly : boolean, id :string) =>
    {
        setInStockOnly(stockOnly)
    }

    return <div>
        <TextInput
            id="SearchProduct"
            placeholder="Search..."
            onChange={onFilterTextChange}
            defaultValue={filterText}/>
        <Checkbox
            id="ProductOnStock"
            label="Produit en stock seulement"
            onChange={onInStockOnlyChange}
            defaultChecked={inStockOnly}/>
    </div>
})

export default ProductTableFilters