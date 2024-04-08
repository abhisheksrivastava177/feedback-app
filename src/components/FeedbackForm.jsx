import RatingSelect from "./RatingSelect";
import Button from "./shared/Button";
import Card from "./shared/Card";
import { useState, useContext, useEffect } from "react";
import FeedbackContext from "../context/FeedbackContext";

const MIN_RATING = 1
const MAX_RATING = 10

function FeedbackForm() {
    const { addFeedback, feedbackToBeEdited, editFeedback } = useContext(FeedbackContext)
    const [ text, setText ] = useState('')
    const [ btnDisabled, setBtnDisabled] = useState(true)
    const [ message, setMessage ] = useState('')
    const [ rating, setRating ] = useState(MAX_RATING)

    useEffect(() => {
        if(feedbackToBeEdited.constructor === Object && Object.keys(feedbackToBeEdited).length !== 0) {
            setBtnDisabled(false)
            setText(feedbackToBeEdited.text)
            setRating(feedbackToBeEdited.rating)
        }
    }, [feedbackToBeEdited])
      
    const handleTextChange = (e) => {
        let newText = e.target.value
        
        if (newText.trim() === '') {
            setBtnDisabled(true)
            setMessage(null)
        } else if (newText.trim() !== '' && newText.trim().length < 10) {
            setBtnDisabled(true)
            setMessage('Feedback must be 10 characters long')
        } else {
            setBtnDisabled(false)
            setMessage('')
        }

        setText(newText)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        
        if (text.trim().length >= 10) {
            const newFeedback = { text, rating }
            if(feedbackToBeEdited.constructor === Object && Object.keys(feedbackToBeEdited).length !== 0) {
                editFeedback(newFeedback)
            } else {
                addFeedback(newFeedback)
            }
            setText('')
            setRating(MAX_RATING)
        }
    }

  return (
    <Card>
        <form onSubmit={handleSubmit}>
            <h2>How would you rate your service with us?</h2>
            <RatingSelect min={MIN_RATING} max={MAX_RATING} select={rating => setRating(rating)}/>
            <div className="input-group">
                <input onChange={handleTextChange} type='text' placeholder="Write a review" value={text}/>
                <Button type='submit' isDisabled={btnDisabled}>Send</Button>
            </div>
            { message && <div className="message">{message}</div> }
        </form>
    </Card>
  )
}

export default FeedbackForm
