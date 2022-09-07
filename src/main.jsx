// Root packages, Libs
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// Styling
import './styles/_default.scss'

// Components, Pages, Hooks
import { Header } from './components/Header/Header'
import { Footer } from './components/Footer/Footer'
import { getRoutes } from './hooks/getRoutes' // Get pages


/* Code */
const App = () => (
  <Router>
    <Header />
    <Routes>
      {
        getRoutes().map(({ path, Component }) => (
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
