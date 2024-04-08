import { createContext, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

const FeedbackContext = createContext()

export const FeedbackContextProvider = ({children}) => {
    const [ feedback, setFeedback ] = useState([
        {
            id: 1, 
            text: 'This item is feedback item 1',
            rating: 10
        },
        {
            id: 2, 
            text: 'This item is feedback item 2',
            rating: 5
        },
        {
            id: 3, 
            text: 'This item is feedback item 3',
            rating: 8
        }
    ])

    const [ feedbackToBeEdited, setFeedbackToBeEdited ] = useState({})

    const deleteFeedback = (id) => {
        if(window.confirm('Are you sure you want to delete?')) {
            setFeedback(feedback.filter(item => item.id !== id))
        }
    }
    
    const addFeedback = (newFeedback) => {
        newFeedback.id = uuidv4()
        setFeedback([newFeedback, ...feedback])
    }

    const editFeedback = (editedFeedback) => {
        setFeedback(feedback.map(item => {
            if(item.id === feedbackToBeEdited.id) {
                item.text = editedFeedback.text
                item.rating = editedFeedback.rating
            }
            return item
        }))
    }

    return <FeedbackContext.Provider value={{
        feedback,
        feedbackToBeEdited,
        deleteFeedback,
        addFeedback,
        setFeedbackToBeEdited,
        editFeedback
    }}>
        {children}
    </FeedbackContext.Provider>
}

export default FeedbackContext;