const { useState } = React

import { AppHeader } from "./cmps/AppHeader.jsx"
import { About } from "./pages/About.jsx"
import { Home } from "./pages/Home.jsx"
import { CarIndex } from "./pages/CarIndex.jsx"

export function RootCmp() {

    const [page, setPage] = useState('car')

    return (
        <section className="app">
            <header className="app-header container">
                <section>
                    <h1>React Car App</h1>
                    <nav className="app-nav">
                        <a onClick={() => setPage('home')}>Home</a>
                        <a onClick={() => setPage('about')}>About</a>
                        <a onClick={() => setPage('car')}>Cars</a>
                    </nav>
                </section>
            </header>

            <main>
                {page === 'home' && <Home />}
                {page === 'about' && <About />}
                {page === 'car' && <CarIndex />}
            </main>
        </section>
    )
} 