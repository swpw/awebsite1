import { useState, useEffect, forwardRef } from 'react'
import css from './Button.module.scss'

import { getAnimateRoot } from '../../context/AnimateRootContext';
import { gsap_buttonOpen, gsap_buttonClose } from './animations';
import { gsap_translateRoot } from '../../pages/animations';


export const Button = forwardRef(({ isMenuOpen, setIsMenuOpen }, ref) => {
	const [isMenuDisabled, setIsMenuDisabled] = useState(false)

	const animateRootRef = getAnimateRoot()

	const handleButton = () => {
		if (!isMenuDisabled) {
			const disabledTimeout = 800

			setIsMenuDisabled(true)
			setIsMenuOpen(prev => ({ state: !prev.state, clicked: true }))

			setTimeout(() =>
				setIsMenuDisabled(false), disabledTimeout)
		}
	}

	useEffect(() => {
		if (isMenuOpen.state) {
			gsap_buttonOpen(ref.current, .2)
			gsap_translateRoot(animateRootRef, true)
		} else {
			gsap_buttonClose(ref.current, .2)
			gsap_translateRoot(animateRootRef, false)
		}
	}, [isMenuOpen])

	return (
		<button className={css.button}
			ref={ref}
			onClick={handleButton}
			disabled={isMenuDisabled}
		>
			<div></div>
			<div></div>
			<div></div>
		</button>
	)
})
