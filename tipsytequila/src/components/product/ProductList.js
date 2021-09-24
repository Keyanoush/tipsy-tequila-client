import React, { useContext, useEffect } from "react"
import { ProductContext } from "./ProductProvider.js"
import { useHistory } from "react-router-dom"

export const ProductList = (props) => {
    const { products, getProducts } = useContext(ProductContext)

    useEffect(() => {
        getProducts()
    }, [])

    const history = useHistory()

    return (
        <article className="products">
            {
                products.map(product => {
                    return <section key={`product--${product.id}`} className="product">
                        <div className="product__name">{product.name}</div>
                        <div className="product__price">{product.price}</div>
                        <div className="product__image">{product.image_path}</div>
                        <div className="product_purchase">
                <button onClick={event => {
                  event.preventDefault()
                  history.push(`/products/detail/${product.id}`)
                }}>
                  Purchases
                </button>
              </div>
                    </section>
                })
            }
        </article>
    )
}