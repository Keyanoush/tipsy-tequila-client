import React, { useContext, useEffect, useState } from "react"
import { ReviewContext } from "../review/ReviewProvider"
import { useHistory, useParams } from 'react-router-dom';

export const ReviewForm = () => {
  const { createReview, updateReview, getReview } = useContext(ReviewContext)

  /*
  With React, we do not target the DOM with `document.querySelector()`. Instead, our return (render) reacts to state or props.
  Define the intial state of the form inputs with useState()
  */
    const description = React.createRef();
  const [review, setReview] = useState({
      description: ""
  });

  const [isLoading, setIsLoading] = useState(true);

  const {reviewId, productId} = useParams();

  const history = useHistory();

  /*
  Reach out to the world and get customers state
  and locations state on initialization.
  */


  //when a field changes, update state. The return will re-render and display based on the values in state
  //Controlled component
  const handleControlledInputChange = (event) => {
    /* When changing a state object or array,
    always create a copy, make changes, and then set state.*/
    const newReview = { ...review }
    /* Review is an object with properties.
    Set the property to the new value
    using object bracket notation. */
    newReview.description = description.current.value
    newReview.product = 1
    // update state
    setReview(newReview)
  }

  const handleClickSaveReview = (event) => {
    event.preventDefault() //Prevents the browser from submitting the form

    if (review.description === "") {
      window.alert("Please write a description")
    } else {
      //Invoke addReview passing the new review object as an argument
      //Once complete, change the url and display the review list

      
      if (reviewId){
        updateReview({
          id: review.id,
          description: review.description
        })
        .then(() => history.goBack())
      }else {
        createReview({
            description: review.description,
            productId: productId
        })
        .then(() => history.goBack())
      }      
    }
  }

  useEffect(() => {
    if (reviewId){
      getReview(reviewId)
      .then(review => {
        setReview(review)
        setIsLoading(false)
      })
    } else {
      setIsLoading(false)
    }
  }, [])

  return (
    <form className="reviewForm">
      <h2 className="reviewForm__title">New Review</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="name">Review Description:</label>
          <input type="text" id="name" required autoFocus className="form-control" 
          placeholder="Review name" value={review.description} ref={description} onChange={handleControlledInputChange} />
        </div>
      </fieldset>
      <button className="btn btn-primary" onClick={handleClickSaveReview}>
        Save Review
          </button>
    </form>
  )
}