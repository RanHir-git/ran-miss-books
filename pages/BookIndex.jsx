import { BookFilter } from "../cmps/BookFilter.jsx"
import { BookList } from "../cmps/BookList.jsx"
import { bookService } from "../services/book.service.js"
import { BookDetails } from "./BookDetails.jsx"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { BookAdd } from "../cmps/BookAdd.jsx"
import { animateCSS } from "../services/util.service.js"

const { useState, useEffect, useRef } = React
const { Link, useSearchParams } = ReactRouterDOM

export function BookIndex() {

    const [books, setBooks] = useState(null)
    const [searchParams, setSearchParams] = useSearchParams()
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter(searchParams))
    const [selectedBookId, setSelectedBookId] = useState(null)
    const contentRef = useRef(null)

    useEffect(() => {
        loadBooks()
        setSearchParams(filterBy)
    }, [filterBy])

    // Fade in when books are loaded or when returning from details
    useEffect(() => {
        if (books && contentRef.current && !selectedBookId) {
            requestAnimationFrame(() => {
                if (contentRef.current) {
                    animateCSS(contentRef.current, 'fadeIn')
                }
            })
        }
    }, [books, selectedBookId])

    function loadBooks() {
        bookService.query(filterBy) // { txt: '...', minSpeed:150 }
            .then(setBooks)
            .catch(err => {
                console.log('err:', err)
            })
    }

    function onRemoveBook(bookId) {
        bookService.remove(bookId)
            .then(() => {
                setBooks(books => (
                    books.filter(book => book.id !== bookId)))
                    showSuccessMsg(`Book removed successfully(${bookId})`)
            })
            .catch(err => {
                console.log('err:', err)
                showErrorMsg(`Failed to remove book(${bookId})`)
            })
    }

    function onSelectBookId(bookId) {
        setSelectedBookId(bookId)
    }

    function onSetFilter(newFilterBy) { //{ txt: '...' }
        setFilterBy(filterBy => ({ ...filterBy, ...newFilterBy }))
    }


    if (!books) return <div>Loading...</div>
    return (
        <section className="book-index">
            {!selectedBookId &&
                <div ref={contentRef}>
                    <BookFilter
                        defaultFilter={filterBy}
                        onSetFilter={onSetFilter}
                    />
                    <BookAdd onBookAdded={loadBooks} />
                    <button>
                        <Link to="/book/edit">Add Book (Manually)</Link>
                    </button>
                    <BookList
                        books={books}
                        onRemoveBook={onRemoveBook}
                        onSelectBookId={onSelectBookId}
                    />
                </div>
            }

            {selectedBookId &&
                <BookDetails
                    bookId={selectedBookId}
                    onBack={() => setSelectedBookId(null)}
                />
            }
        </section>
    )

}