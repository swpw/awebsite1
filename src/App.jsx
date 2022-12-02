import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// Styling
import './styles/_default.scss'

// Components, Pages, Hooks
import { Header } from './components/Header/Header'
import { Footer } from './components/Footer/Footer'
import { getRoutes } from './hooks/getRoutes' // Get pages
import { AnimateRootProvider } from './context/AnimateRootContext' // Provide Ref of animatable elements
import { LoaderProvider } from './context/Loader' // Provide loader state

/* Code */
export const App = () => (
	<Router>
		<LoaderProvider>
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
		</LoaderProvider>
	</Router>
)