import React, { useContext, useEffect, useState } from "react"
import { ProductContext } from "./ProductProvider.js"
import { ReviewContext } from "../review/ReviewProvider.js"
import { RatingContext } from "../rating/RatingProvider.js"
import { OrderContext } from "../order/OrderProvider.js"
import { useParams, useHistory } from "react-router-dom"

export const ProductDetail = (props) => {
    const { getProduct, addProduct } = useContext(ProductContext)    
    const { getReviewsByProductId, deleteReview } = useContext(ReviewContext)
    const { getRatingsByProductId } = useContext(RatingContext)
    const { getOrder } = useContext(OrderContext)    
    const [ product, setProduct ] = useState([])
    const [ review, setReview ] = useState([])
    const [ rating, setRating ] = useState([])
    const [ order, setOrder ] = useState([])
    const [ avg, setAvg ] = useState([])


    const { productId, orderId } = useParams()

    const history = useHistory()

    const handleDelete = (reviewObj) => {
        deleteReview(reviewObj)
          .then(() => {
            getReviewsByProductId(productId)
        .then((data)=> setReview(data))
          })
      }

    const addToOrder = (productId) => {
        addProduct({productId})
        .then((orderproduct)=> history.push(`/orders/${orderproduct.order.id}`))
    }

    useEffect(() => {
        getProduct(productId)
        .then((data)=> setProduct(data))
    }, [productId])

    
    useEffect(() => {
        getReviewsByProductId(productId)
        .then((data)=> setReview(data))
    }, [productId])

    useEffect(() => {
        getRatingsByProductId(productId)
        .then((data)=> setRating(data))
    }, [productId])

    useEffect(() => {
        getOrder(orderId)
        .then((data)=> setOrder(data))
    }, [orderId])


    useEffect(() => {
       let total = 0
    for (let index = 0; index < rating.length; index++) {
        const total_rating = rating[index]
        total += total_rating.score
    }
     const average = total/rating.length
     setAvg(average)
    }, [rating])
    
    

    return (
        <article className="products">
         
                    <section key={`product--${product.id}`} className="product">
                        <div className="product__name">{product.name}</div>
                        <div className="product__price">{product.price}</div>
                        <div className="product__image">{product.image_path}</div>
                        <div className="product__description">{product.description}</div>
                        <div className="product_purchase">
                        <button onClick={()=> addToOrder(productId)}>Add To Order</button>
              </div>
                    </section>
                    <section key={`rating--${rating.id}`} className="rating">
                        <div className="product__rating">{avg}</div>
                        <div className="rating_button">
                        <button onClick={() => {
            history.push(`/ratings/create/${product.id}`)
        }}>Add Rating</button>
                </div>
                    </section>

                    {review &&
                review.map(review => {
                    return <section key={`review--${review.id}`} className="review">
                        <div className="product__review">{review.description}</div>
                        <div className="update_review">
                        <button onClick={() => {
            history.push(`/reviews/edit/${review.id}`)
        }}>Update</button>
                </div>
                <div className="delete_review">
                <button onClick={()=> handleDelete(review)}>Delete</button>
                </div>
                    </section>
                })
            }
            <div className="add_review">
            <button onClick={() => {
            history.push(`/reviews/create/${product.id}`)
        }}>Add Review</button>
                </div>
               
           
        </article>
    )
}