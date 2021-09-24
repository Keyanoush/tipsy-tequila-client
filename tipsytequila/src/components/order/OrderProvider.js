import React, { useState } from "react"

export const OrderContext = React.createContext()

export const OrderProvider = (props) => {
    const [ orders, setOrders ] = useState([])
    const [ order, setOrder ] = useState({})


    const getOrders = () => {
        return fetch("http://localhost:8000/orders", {
            headers:{
                "Authorization": `Token ${localStorage.getItem("tt_token")}`
            }
        })
            .then(response => response.json())
            .then(setOrders)
    }

    const getOrder = (orderId) => {
        return fetch(`http://localhost:8000/orders/${orderId}`, {
            headers:{
                "Authorization": `Token ${localStorage.getItem("tt_token")}`,
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
        .then(setOrder)
    }

    const createOrder = (order) => {
        return fetch("http://127.0.0.1:8000/orders", {
            method: "POST",
            headers: {
                Authorization: `Token ${localStorage.getItem('tt_token')}`,
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(order)
        })
            .then(getOrders)
    }

    const updateOrder = (order) => {
        return fetch(`http://127.0.0.1:8000/orders/${order.id}`, {
            method: "PUT",
            headers: {
                Authorization: `Token ${localStorage.getItem('tt_token')}`,
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(order)
        })
            .then(getOrders)
    }
    
    const deleteOrder = (orderId) => {
        return fetch(`http://localhost:8000/orders/${orderId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Token ${localStorage.getItem('tt_token')}`
            },
        })
            .then(getOrders)
    }

    const deleteOrderProduct = (orderId) => {
        return fetch(`http://localhost:8000/orderproducts/${orderId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Token ${localStorage.getItem('tt_token')}`
            },
        })
            .then(getOrders)
    }

    return (
        <OrderContext.Provider value={{ orders, order, setOrder, getOrders, createOrder, getOrder, updateOrder, deleteOrder, deleteOrderProduct }} >
            { props.children }
        </OrderContext.Provider>
    )
}