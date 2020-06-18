// Je n'utilise ni d'import, ni de hooks car je n'utilise pas webpack, j'ai voulu développer quelque chose rapidement :) sinon je peux toujours regarder ce tuto https://medium.com/@bouraine/create-a-react-app-from-scratch-cea5b76a1e1b
const products = [
    {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
    {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
    {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
    {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
    {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
    {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"},
    {category: "xxx", price: "$199.99", stocked: true, name: "Nexus 7"}
]

class FilterableProductTable extends React.Component
{
    constructor(props)
    {
        super(props)

        this.state = {
            filteredProducts : products
        }
    }

    render()
    {
        return <div className="container col-4">
            <ProductTableFilters/>
            <ProductTable products={this.state.filteredProducts}/>
        </div>
    }
}

function ProductTableFilters()
{
    return <form>
        <Field name="SearchProduct" placeholder="Search..."/>
        <Checkbox name="ProductOnStock" children=" Only show products in stock"/>
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


const ProductTable = React.memo(function({products})
{
    let lastCategory = null
    const rows = []
    
    console.log(products)
    products.forEach(p =>
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
