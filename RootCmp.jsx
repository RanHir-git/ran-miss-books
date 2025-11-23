const { useState } = React

import { AppHeader } from "./cmps/AppHeader.jsx"
import { About } from "./pages/About.jsx"
import { Home } from "./pages/Home.jsx"
import {BookIndex } from "./pages/BookIndex.jsx"

export function RootCmp() {

    const [page, setPage] = useState('book')

    return (
        <section className="app">
            <header className="app-header container">
                <section>
                    <h1>Miss Books</h1>
                    <nav className="app-nav">
                        <a onClick={() => setPage('home')}>Home</a>
                        <a onClick={() => setPage('about')}>About</a>
                        <a onClick={() => setPage('book')}>Books</a>
                    </nav>
                </section>
            </header>

            <main>
                {page === 'home' && <Home />}
                {page === 'about' && <About />}
                {page === 'book' && <BookIndex />}
            </main>
        </section>
    )
} 