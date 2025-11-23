import { loadFromStorage, makeId, saveToStorage } from './util.service.js'
import { storageService } from './async-storage.service.js'

const BOOK_KEY = 'bookDB'
_createBooks()

export const bookService = {
    query,
    get,
    remove,
    save,
    getEmptyBook,
    getDefaultFilter
}

function query(filterBy = {}) {
    return storageService.query(BOOK_KEY)
        .then(books => {
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                books = books.filter(book => regExp.test(book.title))
            }
            if (filterBy.listPrice) {
                books = books.filter(book => book.listPrice.amount >= filterBy.listPrice)
            }
            return books
        })
}

function get(bookId) {
    return storageService.get(BOOK_KEY, bookId)
}

function remove(bookId) {
    // return Promise.reject('Oh No!')
    return storageService.remove(BOOK_KEY, bookId)
}

function save(book) {
    if (book.id) {
        return storageService.put(BOOK_KEY, book)
    } else {
        return storageService.post(BOOK_KEY, book)
    }
}

function getEmptyBook(title = '', listPriceAmount = 100) {
    return { 
        title, 
        listPrice: {
            amount: listPriceAmount,
            currencyCode: 'EUR',
            isOnSale: false
        }, 
        description: '', 
        thumbnail: '' 
    }
}

function getDefaultFilter() {
    return { txt: '', listPrice: '' }
}

function _createBooks() {
    let books = loadFromStorage(BOOK_KEY)
    if (!books || !books.length) {
        books = [
            _createBook('Harry Potter', 50),
            _createBook('LOTR', 120),
            _createBook(`the hitchhiker's guide to the galaxy`, 50),
            _createBook('a man named ove', 150)
        ]
        saveToStorage(BOOK_KEY, books)
    }
}

function _createBook(title, listPriceAmount = 100) {
    const book = getEmptyBook(title, listPriceAmount)
    book.id = makeId()
    book.description = "placerat nisi sodales suscipit tellus"
    book.thumbnail = "https://www.coding-academy.org/books-photos/20.jpg"
    return book
}