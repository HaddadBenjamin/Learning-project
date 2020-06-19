// Je n'utilise ni d'import, ni de hooks car je n'utilise pas webpack, j'ai voulu développer quelque chose rapidement :) sinon je peux toujours regarder ce tuto https://medium.com/@bouraine/create-a-react-app-from-scratch-cea5b76a1e1b
const products = [
    {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
    {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
    {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
    {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
    {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
    {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
]

class FilterableProductTable extends React.PureComponent
{
    constructor(props)
    {
        super(props)

        this.state = {
            filteredProducts : products,
            inStockOnly : false,
            filterText : ''
        }

        this.handleFilterTextChange = this.handleFilterTextChange.bind(this)
        this.handleInStockOnlyChange = this.handleInStockOnlyChange.bind(this)
    }

    handleFilterTextChange(event)
    {
        this.setState({filterText : event.target.value})
    }

    handleInStockOnlyChange(event)
    {
        this.setState({inStockOnly : event.target.checked})
    }

    render()
    {
        return <div className="container col-4">
            <ProductTableFilters
                inStockOnly={this.state.inStockOnly}
                filterText={this.state.filterText}
                onFilterTextChange={this.handleFilterTextChange}
                onStockOnlyChange={this.handleInStockOnlyChange}/>
            <ProductTable
                products={this.state.filteredProducts}
                inStockOnly={this.state.inStockOnly}
                filterText={this.state.filterText}/>
        </div>
    }
}

function ProductTableFilters({filterText, inStockOnly, onFilterTextChange, onStockOnlyChange})
{
    return <form>
        <Field 
            name="SearchProduct"
            placeholder="Search..."
            onChange={onFilterTextChange}
            value={filterText} />
        <Checkbox 
            name="ProductOnStock"
            children="Produit en stock seulement"
            onChange={onStockOnlyChange}
            checked={inStockOnly}/>
    </form>
}

const Field = React.memo(function({name, value = undefined, onChange = () => {}, children = undefined, placeholder = undefined})
{
    return <div className="form-group">
        <label htmlFor={name}>{children}</label>
        <input type="text" value={value} placeholder={placeholder} onChange={onChange} id={name} name={name} className="form-control"></input>
    </div>
})

const Checkbox = React.memo(function({name, checked = false, onChange = () => {}, children = undefined})
{
    return <div className="form-check">
        <input type="checkbox" checked={checked} onChange={onChange} id={name} name={name} className="form-check-label"></input>
        <label htmlFor={name} className="form-check-label ml-1">{children}</label>
    </div>
})

const ProductTable = React.memo(function({products, filterText, inStockOnly})
{
    let lastCategory = null
    const rows = []
    const filteredProducts = products.filter(p => (!inStockOnly || p.stocked) && p.name.includes(filterText))
        
    filteredProducts.forEach(p =>
    {
        if (lastCategory != p.category)
        {
            lastCategory = p.category
            rows.push(<ProductCategoryRow key={p.category} product={p}/>)
        }

        rows.push(<ProductRow key={p.name} product={p}/>)
    })

    return <div>
        <table className="table table-dark table-striped mt-4">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>{rows}</tbody>
        </table>
    </div>
})

const ProductCategoryRow = React.memo(function({product})
{
    return <tr>
        <th colSpan="2">{product.category}</th>
    </tr>
})

const ProductRow = React.memo(function({product})
{
    const nameClasses = product.stocked ? '' : 'text-danger';

    return <tr>
        <td className={nameClasses}>{product.name}</td>
        <td>{product.price}</td>
    </tr>
})

ReactDOM.render(
    React.createElement(FilterableProductTable),
    document.getElementById('app'))
