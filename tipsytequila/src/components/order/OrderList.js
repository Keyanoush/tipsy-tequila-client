import React, { useContext, useEffect } from "react"
import { OrderContext } from "./OrderProvider.js"
import { useParams } from "react-router-dom"
import { ProductContext } from "../product/ProductProvider.js"


export const OrderList = (props) => {
    const { order, getOrder, deleteOrderProduct } = useContext(OrderContext)
    const { getProductsByOrderId } = useContext(ProductContext)

    
    const { orderId } = useParams()

    const handleDelete = (orderObj) => {
        deleteOrderProduct(orderObj)
          .then(() => {
            getProductsByOrderId(orderId)
        // .then((data)=> setOrderProduct(data))
          })
      }

    useEffect(() => {
        getOrder(orderId)
    }, [orderId])


    return (
        <article className="orders">
            <section key={`order--${order.id}`} className="order">
                        <div className="order__purchased">{
                            order.lineitems?.map(orderObj => {
                                return (
                                    <section key={`product--${orderObj.product.id}`} className="product">
                                    <div className="product__name">{orderObj.product.name}</div>
                                    <div className="product__price">{orderObj.product.price}</div>
                                    <div className="product__image">{orderObj.product.image_path}</div>
                                    <div className="product__description">{orderObj.product.description}</div>
                                    <div className="delete_order_product">
                <button onClick={()=> handleDelete(order.id)}>Delete</button>
                </div>
                                    </section>
                            )})
                        }</div>
                    </section>
        </article>
    )
}