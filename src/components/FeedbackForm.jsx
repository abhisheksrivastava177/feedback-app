import RatingSelect from "./RatingSelect";
import Button from "./shared/Button";
import Card from "./shared/Card";
import { useState } from "react";

const MIN_RATING = 1
const MAX_RATING = 10

function FeedbackForm({ handleAdd }) {
    const [ text, setText ] = useState('')
    const [ btnDisabled, setBtnDisabled] = useState(true)
    const [ message, setMessage ] = useState('')
    const [ rating, setRating ] = useState(MAX_RATING)

    const handleTextChange = (e) => {
        let newText = e.target.value
        
        if (newText.trim() === '') {
            setBtnDisabled(true)
            setMessage(null)
        } else if (newText.trim() !== '' && newText.length < 10) {
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
            handleAdd({ text, rating })
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
