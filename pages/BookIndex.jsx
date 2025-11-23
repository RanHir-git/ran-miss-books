import { CarFilter as BookFilter } from "../cmps/BookFilter.jsx"
import { CarList as BookList } from "../cmps/BookList.jsx"
import { bookService as bookService } from "../services/book.service.js"
import { CarDetails as BookDetails } from "./BookDetails.jsx"

const { useState, useEffect } = React

export function CarIndex() {

    const [books, setBooks] = useState(null)
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())
    const [selectedBookId, setSelectedBookId] = useState(null)

    useEffect(() => {
        loadBooks()
    }, [filterBy])

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
                    books.filter(book => book.id !== bookId)
                ))
            })
            .catch(err => {
                console.log('err:', err)
            })
    }

    function onSelectBookId(carId) {
        setSelectedBookId(carId)
    }

    function onSetFilter(newFilterBy) { //{ txt: '...' }
        setFilterBy(filterBy => ({ ...filterBy, ...newFilterBy }))
    }


    if (!books) return <div>Loading...</div>
    return (
        <section className="book-index">
            {!selectedBookId &&
                <React.Fragment>
                    <BookFilter
                        defaultFilter={filterBy}
                        onSetFilter={onSetFilter}
                    />

                    <BookList
                        books={books}
                        onRemoveBook={onRemoveBook}
                        onSelectBookId={onSelectBookId}
                    />
                </React.Fragment>
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