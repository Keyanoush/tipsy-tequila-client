import React, { useContext, useState } from "react"
import { RatingContext } from "../rating/RatingProvider"
import { useHistory, useParams } from 'react-router-dom';

export const RatingForm = () => {
  const { createRating } = useContext(RatingContext)

  /*
  With React, we do not target the DOM with `document.querySelector()`. Instead, our return (render) reacts to state or props.
  Define the intial state of the form inputs with useState()
  */
    const score = React.createRef();
  const [rating, setRating] = useState({
      score: 0.0
  });

  const {productId} = useParams();

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
    const newRating = { ...rating }
    /* Rating is an object with properties.
    Set the property to the new value
    using object bracket notation. */
    newRating.score = score.current.value
    newRating.product = 1
    // update state
    setRating(newRating)
  }

  const handleClickSaveRating = (event) => {
    event.preventDefault() //Prevents the browser from submitting the form

    if (rating.score === 0.0) {
      window.alert("Please enter a score")
    } else {
      //Invoke addRating passing the new rating object as an argument
      //Once complete, change the url and display the rating list

      
      
        createRating({
            score: rating.score,
            productId: productId
        })
        .then(() => history.goBack())
      }      
    }
  

  return (
    <form className="ratingForm">
      <h2 className="ratingForm__title">New Rating</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="name">Rating Description:</label>
          <input type="text" id="name" required autoFocus className="form-control" 
          placeholder="Rating name" value={rating.score} ref={score} onChange={handleControlledInputChange} />
        </div>
      </fieldset>
      <button className="btn btn-primary" onClick={handleClickSaveRating}>
        Save Rating
          </button>
    </form>
  )
}