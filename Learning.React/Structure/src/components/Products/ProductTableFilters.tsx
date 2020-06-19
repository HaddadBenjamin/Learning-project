import {ProductFilters} from "./ProductFilters";
import React, {useEffect, useState} from "react";
import TextInput from "../../shared/components/TextInput/TextInput";
import Checkbox from "../../shared/components/Checkbox/Checkbox";

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

    const onFilterTextChange = (filterText : string) =>
    {
        setFilterText(filterText)
    }

    const onInStockOnlyChange = (stockOnly : boolean) =>
    {
        setInStockOnly(stockOnly)
    }

    return <form>
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
    </form>
})

export default ProductTableFilters