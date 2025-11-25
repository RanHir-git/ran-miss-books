import { AppHeader } from "./cmps/AppHeader.jsx"
import { About } from "./pages/About.jsx"
import { Home } from "./pages/Home.jsx"
import { BookIndex } from "./pages/BookIndex.jsx"
import { BookDetails } from "./pages/BookDetails.jsx"
import { BookEdit } from "./pages/BookEdit.jsx"
import { DashboardPage } from "./pages/DashboardPage.jsx"
import { NotFound } from "./cmps/NotFound.jsx"
import { UserMsg } from "./cmps/UserMsg.jsx"

const Router = ReactRouterDOM.HashRouter
const { Route, Routes, Navigate } = ReactRouterDOM

const { useState } = React



export function RootCmp() {

    return (

        <Router>
            <section className="app">
                <AppHeader />
                <main>
                    <Routes>
                        <Route path="/" element={<Navigate to="/home" />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/book" element={<BookIndex />} />
                        <Route path="/book/:bookId" element={<BookDetails />} />
                        <Route path="/book/edit" element={<BookEdit />} />
                        <Route path="/book/edit/:bookId" element={<BookEdit />} />
                        <Route path="/dashboard" element={<DashboardPage />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </main>
                <UserMsg />
            </section>
        </Router>
    )
}


// <Router>
// <section className="app">
//     <AppHeader />

//     <main>
//         <Routes>
//             <Route path="/" element={<Navigate to="/home" />} />
//             <Route path="/home" element={<Home />} />
//             <Route path="/about" element={<About />} >
//                 <Route path="/about/team" element={<Team />} />
//                 <Route path="/about/vision" element={<Vision />} />
//             </Route>
//             <Route path="/car" element={<CarIndex />} />
//             <Route path="/car/:carId" element={<CarDetails />} />
//             <Route path="/car/edit" element={<CarEdit />} />
//             <Route path="/car/edit/:carId" element={<CarEdit />} />
//             <Route path="*" element={<NotFound />} />
//         </Routes>
//     </main>
//     <UserMsg />
// </section>
// </Router>
// )
