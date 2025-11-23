import { bookService } from "../services/book.service.js"

const { useState, useEffect } = React

export function BookDetails({ bookId, onBack }) {

    const [book, setBook] = useState(null)

    useEffect(() => {
        loadBook()
    }, [bookId])

    function loadBook() {
        bookService.get(bookId)
            .then(book => setBook(book))
            .catch(err => {
                console.log('err:', err)
            })
    }

    if (!book) return <div>Loading...</div>
    const { title, description, listPrice } = book
    return (
        <section className="book-details container">
            <h1>Title: {title}</h1>
            <h1>Price: {listPrice.amount} {listPrice.currencyCode}</h1>
            <p>
                {description}
            </p>
            <img src={book.thumbnail} alt="Title Image" />
            <button onClick={onBack}>Back</button>
        </section>
    )
}