import React, { useContext, useState, useRef } from "react"
import css from './Loader.module.scss'

import { loaderAnimation, closeLoaderAnimation } from './animations'
import { useEffect } from "react"

const LoaderContext = React.createContext()


export const LoaderProvider = ({ children }) => {
	const [loader, setLoader] = useState(false)

	let loaderRef = useRef(null)

	const loadHandler = () => closeLoaderAnimation({
		setLoader,
		loader: loaderRef.current
	})

	useEffect(() => {
		loaderAnimation({ loader: loaderRef.current })

		window.addEventListener('load', loadHandler)
		document.readyState === 'complete' && loadHandler()

		return (() => loadHandler())
	}, [loaderRef])

	return (
		<LoaderContext.Provider value={loader}>
			<div className={css.loader} ref={loaderRef}>
				<h1>loader test text</h1>
			</div>
			{children}
		</LoaderContext.Provider>
	)
}

export const isPageLoaded = () => useContext(LoaderContext)