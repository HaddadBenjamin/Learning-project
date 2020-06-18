function FilterableProductTable()
{
    const products = [
        {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
        {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
        {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
        {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
        {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
        {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
    ];

    // Pour que cette ligne fonctionne, il faudra que je suive le tutoriel de mohamed bouraoine
    // - https://medium.com/@bouraine/create-a-react-app-from-scratch-cea5b76a1e1b
    const [filteredProducts, setFilteredProducts] = useState(products);
    
    return <div className="container col-4">
        <ProductTableFilters/>
        <ProductTable/>
    </div>
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


const ProductTable = React.memo(function()
{
    return <div>
        <table className="table mt-4">
            <thead>
                <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Price</th>
                </tr>
            </thead>
            <tbody>
            </tbody>
        </table>
    </div>
})

ReactDOM.render(
    React.createElement(FilterableProductTable),
    document.getElementById('app'))
