
export function AppHeader({ onSetPage }) {

    return (
        <header className="app-header container">
            <section>
                <h1>React Car App</h1>
                <nav className="app-nav">
                    <a onClick={() => onSetPage('home')}>Home</a>
                    <a onClick={() => onSetPage('about')}>About</a>
                    <a onClick={() => onSetPage('car')}>Cars</a>
                </nav>
            </section>
        </header>
    )
}