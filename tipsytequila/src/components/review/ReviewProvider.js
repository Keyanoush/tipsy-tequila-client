import React, { useState } from "react"

export const ReviewContext = React.createContext()

export const ReviewProvider = (props) => {
    const [ reviews, setReviews ] = useState([])
    

    const getReviews = () => {
        return fetch("http://localhost:8000/reviews", {
            headers:{
                "Authorization": `Token ${localStorage.getItem("tt_token")}`
            }
        })
            .then(response => response.json())
            .then(setReviews)
    }

    const getReview = (reviewId) => {
        return fetch(`http://localhost:8000/reviews/${reviewId}`, {
            headers:{
                "Authorization": `Token ${localStorage.getItem("tt_token")}`
            }
        }).then(res => res.json())
    }

    const createReview = (review) => {
        return fetch("http://127.0.0.1:8000/reviews", {
            method: "POST",
            headers: {
                Authorization: `Token ${localStorage.getItem('tt_token')}`,
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(review)
        })
            .then(getReviews)
    }

    const updateReview = (review) => {
        return fetch(`http://127.0.0.1:8000/reviews/${review.id}`, {
            method: "PUT",
            headers: {
                Authorization: `Token ${localStorage.getItem('tt_token')}`,
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(review)
        })
            .then(getReviews)
    }
    
    const deleteReview = (review) => {
        return fetch(`http://localhost:8000/reviews/${review.id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Token ${localStorage.getItem('tt_token')}`
            },
        })
            .then(getReviews)
    }

    const getReviewsByProductId = (productId) => {
        return fetch(`http://localhost:8000/reviews?item=${productId}`, {
            headers:{
                "Authorization": `Token ${localStorage.getItem("tt_token")}`
            }
        })
            .then(response => response.json())
            
    }

    return (
        <ReviewContext.Provider value={{ reviews, getReviews, createReview, getReview, updateReview, deleteReview, getReviewsByProductId }} >
            { props.children }
        </ReviewContext.Provider>
    )
}