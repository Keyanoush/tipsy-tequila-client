import React, { useState } from "react"

export const RatingContext = React.createContext()

export const RatingProvider = (props) => {
    const [ ratings, setRatings ] = useState([])
    const [ setRating ] = useState([])

    const getRatings = () => {
        return fetch("http://localhost:8000/ratings", {
            headers:{
                "Authorization": `Token ${localStorage.getItem("tt_token")}`
            }
        })
            .then(response => response.json())
            .then(setRatings)
    }

    const getRating = (ratingId) => {
        return fetch(`http://localhost:8000/ratings/${ratingId}`, {
            headers:{
                "Authorization": `Token ${localStorage.getItem("tt_token")}`
            }
        }).then(res => res.json())
    }

    const createRating = (rating) => {
        return fetch("http://127.0.0.1:8000/ratings", {
            method: "POST",
            headers: {
                Authorization: `Token ${localStorage.getItem('tt_token')}`,
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(rating)
        })
            .then(getRatings)
    }

    const updateRating = (rating) => {
        return fetch(`http://127.0.0.1:8000/ratings/${rating.id}`, {
            method: "PUT",
            headers: {
                Authorization: `Token ${localStorage.getItem('tt_token')}`,
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(rating)
        })
            .then(getRatings)
    }
    
    const deleteRating = (ratingId) => {
        return fetch(`http://localhost:8000/ratings/${ratingId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Token ${localStorage.getItem('tt_token')}`
            },
        })
            .then(getRatings)
    }

    const getRatingsByProductId = (productId) => {
        return fetch(`http://localhost:8000/ratings?item=${productId}`, {
            headers:{
                "Authorization": `Token ${localStorage.getItem("tt_token")}`
            }
        })
            .then(response => response.json())
            .then(setRating)
    }

    return (
        <RatingContext.Provider value={{ ratings, getRatings, createRating, getRating, updateRating, deleteRating, getRatingsByProductId }} >
            { props.children }
        </RatingContext.Provider>
    )
}