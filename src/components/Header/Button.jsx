import { useState, useEffect, useRef } from 'react'
import css from './Button.module.scss'

import { getAnimateRoot } from '../../context/AnimateRootContext';
import { gsap_buttonOpen, gsap_buttonClose } from './animations';
import { gsap_translateRoot } from '../../pages/animations';


export const Button = ({ isMenuOpen, setIsMenuOpen }) => {
	const [isMenuDisabled, setIsMenuDisabled] = useState(false)

	let buttonRef = useRef(null)
	const animateRootRef = getAnimateRoot()

	const handleButton = () => {
		if (!isMenuDisabled) {
			const disabledTimeout = 800

			setIsMenuDisabled(true)
			setIsMenuOpen(prev => !prev)

			setTimeout(() =>
				setIsMenuDisabled(false), disabledTimeout)
		}
	}

	useEffect(() => {
		if (isMenuOpen) {
			gsap_buttonOpen(buttonRef, .2)
			gsap_translateRoot(animateRootRef, true)
		} else {
			gsap_buttonClose(buttonRef, .2)
			gsap_translateRoot(animateRootRef, false)
		}
	}, [isMenuOpen])

	return (
		<button className={css.button}
			ref={el => buttonRef = el}
			onClick={handleButton}
			disabled={isMenuDisabled}
		>
			<div></div>
			<div></div>
			<div></div>
		</button>
	)
}
