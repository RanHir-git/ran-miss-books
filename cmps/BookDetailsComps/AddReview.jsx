import { bookService } from "../../services/book.service.js"
import { showErrorMsg, showSuccessMsg } from "../../services/event-bus.service.js"


const { useState } = React

const { useParams } = ReactRouterDOM

export function AddReview({ onReviewAdded, onCancel }) {
    const [fullname, setFullname] = useState('')
    const [rating, setRating] = useState('')
    const [readAt, setReadAt] = useState('')
    const { bookId } = useParams()
    const [isLoading, setIsLoading] = useState(false)

    function onAddReview(ev) {
        ev.preventDefault()
        setIsLoading(true)
        
        const review = {
            fullname: fullname.trim(),
            rating: +rating,
            readAt
        }
        
        bookService.addReview(bookId, review)
            .then(savedBook => {
                setIsLoading(false)
                setFullname('')
                setRating('')
                setReadAt('')
                showSuccessMsg('Review added successfully')
                if (onReviewAdded) onReviewAdded() // Reload book data
            })
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Failed to add review')
            })
            .finally(() => setIsLoading(false))
    }
    function handleChange({ target }) {
        const field = target.name
        let value = target.value
        if (field === 'fullname') {
            value = value ? value.trim() : ''
            setFullname(value)
            return
        }
        if (field === 'rating') {
            // Only allow values between 1-5
            const numValue = +value
            if (value === '' || (numValue >= 1 && numValue <= 5)) {
                setRating(value) // Keep as string for the input
            }
            else{
                showErrorMsg('Rating must be between 1 and 5')
            }
            return
        }
        if (field === 'readAt') {
            value = value ? new Date(value).toISOString().split('T')[0] : ''
            setReadAt(value)
            return
        }
    }
    const loadingClass = isLoading ? 'loading' : ''
    return (
        <section className={`add-review ${loadingClass}`}>
            <h2>Add Review</h2>
            <form onSubmit={onAddReview}>
                <label htmlFor="fullname">Full Name</label>
                <input onChange={handleChange} value={fullname || ''} type="text" name="fullname" id="fullname" />
                <label htmlFor="rating">Rating (1-5)</label>
                <input 
                    onChange={handleChange} 
                    value={rating || ''} 
                    type="number" 
                    name="rating" 
                    id="rating"
                    min="1"
                    max="5"
                    step="1"
                    required
                />
                <label htmlFor="readAt">Read At</label>
                <input onChange={handleChange} value={readAt || ''} type="date" name="readAt" id="readAt" />
                <button type="submit">Add Review</button>
                <button type="button" onClick={onCancel}>Cancel</button>
            </form>
        </section>
    )
}
