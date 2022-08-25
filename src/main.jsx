// Root packages, Libs
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// Components, Pages
import Home from './pages/Home'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'

// Styling
import './index.scss'



/* Code */
const routes = [
    { path: '/', Component: Home }
]

const App = () => (
    <Router>
        <Header />
        <Routes>
            {
                routes.map(({ path, Component }) => (
                    <Route key={path} exact path={path} element={<Component />} />
                ))
            }
        </Routes>
        <Footer />
    </Router>
)



// Init
ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
)
