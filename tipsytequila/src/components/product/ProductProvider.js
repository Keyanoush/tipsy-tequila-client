import React, { useState } from "react"

export const ProductContext = React.createContext()

export const ProductProvider = (props) => {
    const [ products, setProducts ] = useState([])

    const getProducts = () => {
        return fetch("http://localhost:8000/products", {
            headers:{
                "Authorization": `Token ${localStorage.getItem("tt_token")}`
            }
        })
            .then(response => response.json())
            .then(setProducts)
    }

    const createProduct = (product) => {
        return fetch("http://127.0.0.1:8000/products", {
            method: "POST",
            headers: {
                Authorization: `Token ${localStorage.getItem('tt_token')}`,
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(product)
        })
            .then(getProducts)
    }

    const getProduct = (productId) => {
        return fetch(`http://localhost:8000/products/${productId}`, {
            headers:{
                "Authorization": `Token ${localStorage.getItem("tt_token")}`
            }
        }).then(res => res.json())
    }

    const addProduct = (productId) => {
        return fetch("http://127.0.0.1:8000/orderproducts", {
            method: "POST",
            headers: {
                Authorization: `Token ${localStorage.getItem('tt_token')}`,
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(productId)
        })
        .then(res => res.json())
    }

    const getProductsByOrderId = (orderId) => {
        return fetch(`http://localhost:8000/orderproducts?order=${orderId}`, {
            headers:{
                "Authorization": `Token ${localStorage.getItem("tt_token")}`
            }
        }).then(res => res.json())
        
    }

    

    return (
        <ProductContext.Provider value={{ products, getProducts, createProduct, getProduct, addProduct, getProductsByOrderId }} >
            { props.children }
        </ProductContext.Provider>
    )
}