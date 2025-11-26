import { bookService } from "../services/book.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"

const { useState, useEffect } = React

export function DashboardPage() {
    const [booksByCategory, setBooksByCategory] = useState({})
    const [totalBooks, setTotalBooks] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const [viewMode, setViewMode] = useState('percentage') // 'percentage' or 'count'

    useEffect(() => {
        loadBooks()
    }, [])

    function loadBooks() {
        setIsLoading(true)
        bookService.query().then(
            books => {
                const grouped = groupBooksByCategory(books)
                setBooksByCategory(grouped)
                setTotalBooks(books.length) // Total unique books
            }
        ).catch(err => {
            console.log('err:', err)
            showErrorMsg('Failed to load books')
        }).finally(() => {
            setIsLoading(false)
            showSuccessMsg('Books loaded successfully')
        })
    }

    function groupBooksByCategory(books) {
        const grouped = {}

        books.forEach(book => {
            if (book.categories && book.categories.length > 0) {
                book.categories.forEach(category => {
                    if (!grouped[category]) {
                        grouped[category] = []
                    }
                    grouped[category].push(book)
                })
            } else {
                const uncategorized = 'Uncategorized'
                if (!grouped[uncategorized]) {
                    grouped[uncategorized] = []
                }
                grouped[uncategorized].push(book)
            }
        })

        return grouped
    }

    function toggleViewMode() {
        setViewMode(prev => prev === 'percentage' ? 'count' : 'percentage')
    }

    if (isLoading) return <div>Loading...</div>

    const categories = Object.keys(booksByCategory).sort()
    const categoryCounts = categories.map(cat => booksByCategory[cat].length)
    const maxCount = Math.max(...categoryCounts, 1)
    
    // Calculate total category assignments (since books can be in multiple categories)
    const totalCategoryAssignments = categoryCounts.reduce((sum, count) => sum + count, 0)

    // Determine y-axis labels and max value based on view mode
    let yAxisLabels, maxValue
    if (viewMode === 'percentage') {
        yAxisLabels = [100, 80, 60, 40, 20, 0]
        maxValue = 100
    } else {
        const step = Math.ceil(maxCount / 5)
        yAxisLabels = []
        for (let i = maxCount; i >= 0; i -= step) {
            yAxisLabels.push(i)
        }
        maxValue = maxCount
    }

    return (
        <section className="dashboard-page container">
            <h1>Books Dashboard - By Category</h1>

            {categories.length === 0 ? (
                <p>No books found.</p>
            ) : (
                <React.Fragment>
                    <div className="chart">
                        <div className="y-axis">
                            {yAxisLabels.map((value, idx) => (
                                <div key={idx} className="y-axis-label">
                                    {viewMode === 'percentage' ? `${value}%` : value}
                                </div>
                            ))}
                        </div>
                        <div className="chart-bars">
                            {categories.map(category => {
                                const count = booksByCategory[category].length
                                let barHeight, displayValue
                                
                                if (viewMode === 'percentage') {
                                    // Percentage of category assignments (since books can be in multiple categories)
                                    // This represents what portion of all category assignments this category represents
                                    const percentage = totalCategoryAssignments > 0 ? (count / totalCategoryAssignments) * 100 : 0
                                    barHeight = percentage
                                    displayValue = `${percentage.toFixed(1)}%`
                                } else {
                                    // Actual count
                                    barHeight = (count / maxValue) * 100
                                    displayValue = count
                                }
                                
                                return (
                                    <div key={category} className="chart-bar-wrapper">
                                        <div
                                            className="chart-bar"
                                            style={{ height: `${barHeight}%` }}
                                            title={`${category}: ${count} book${count !== 1 ? 's' : ''}`}
                                        >
                                            <span className="chart-value">{displayValue}</span>
                                        </div>
                                        <div className="chart-label">{category}</div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className="chart-controls">
                        <button onClick={toggleViewMode}>
                            {viewMode === 'percentage' ? 'Count View' : 'Percentage View'}
                        </button>
                    </div>
                </React.Fragment>
            )}
        </section>
    )
}

