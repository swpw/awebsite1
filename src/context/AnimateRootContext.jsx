import React, { useContext, useRef } from "react"

const AnimateRootContext = React.createContext()

export const AnimateRootProvider = ({ children }) => {
	const containerRef = useRef(null)
	const excludedComponent = 'Header'

	return (
		<AnimateRootContext.Provider value={containerRef}>
			{children.find(e => e.type.name === excludedComponent)}
			<div ref={containerRef}>
				{
					children.map((component) =>
						component.type.name !== excludedComponent && component)
				}
			</div>
		</AnimateRootContext.Provider>
	)
}

export const getAnimateRoot = () => useContext(AnimateRootContext)