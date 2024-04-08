import { useState, useContext, useEffect } from "react"
import FeedbackContext from "../context/FeedbackContext"

function RatingSelect({ min, max, select }) {
    const [ selected, setSelected ] = useState(max)
    const { feedbackToBeEdited } = useContext(FeedbackContext)

    useEffect(() => {
      if(feedbackToBeEdited.constructor === Object && Object.keys(feedbackToBeEdited).length !== 0) {
        setSelected(feedbackToBeEdited.rating)
      }
    }, [feedbackToBeEdited])

    const handleChange = (e) => {
        setSelected(+e.target.value)
        select(+e.target.value)
    }

    const ratingsArrray = [...Array(max - min + 1).keys()].map(value => value + min)

  return (
    <div>
      <ul className="rating">
        { ratingsArrray.map(rating => <FeedbackRatingValue key={rating} value={rating} handleChange={handleChange}  checked={selected === rating}/>)}
      </ul>
    </div>
  )
}


function FeedbackRatingValue({ value, handleChange, checked}) {
    return <li>
            <input 
                type="radio"
                id={`num${value}`}
                name="rating"
                value={value}
                onChange={handleChange}
                checked={checked}
            />
            <label htmlFor={`num${value}`}>{value}</label>
        </li>
}

export default RatingSelect
