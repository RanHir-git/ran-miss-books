const { Link } = ReactRouterDOM

import { BookPreview } from "./BookPreview.jsx";

export function BookList({ books, onRemoveBook, onSelectBookId }) {

    return (
        <ul className="book-list container">
            {books.map(book => (
                <li className="book-list-item" key={book.id} >
                    <BookPreview book={book} />
                    <section>
                        <button title="Delete" onClick={() => onRemoveBook(book.id)}>
                            <img src="../assets/img/trash-icon.svg" alt="Delete" />
                        </button>   
                        <button><Link to={`/book/${book.id}`}>Details</Link></button>
                        <button title="Edit"><Link to={`/book/edit/${book.id}`}><img src="../assets/img/edit-icon.svg" alt="Edit" /></Link></button>
                    </section>
                </li>
            ))}
        </ul>
    )

}