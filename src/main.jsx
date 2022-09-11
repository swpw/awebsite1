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
import { AnimateRootProvider } from './context/AnimateRootContext' // Provide Ref of animatable elements

/* Code */
const App = () => (
  <Router>
    <AnimateRootProvider>
      <Header />
      <Routes>
        {
          getRoutes().map(({ path, Component }) => (
            <Route key={path} exact path={path} element={<Component />} />
          ))
        }
      </Routes>
      <Footer />
    </AnimateRootProvider>
  </Router>
)



// Init
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
