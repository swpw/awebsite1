import { useEffect, useRef } from 'react'
import css from './Button.module.scss'

import { gsap_buttonOpen, gsap_buttonClose } from './animations';



export const Button = ({ isMenuOpen, setIsMenuOpen }) => {
	let buttonRef = useRef(null)

	useEffect(() => {
		isMenuOpen ? gsap_buttonOpen(buttonRef, .2) : gsap_buttonClose(buttonRef, .2)
	}, [isMenuOpen])

	return (
		<button className={css.Button} ref={el => buttonRef = el} onClick={() => setIsMenuOpen(prev => !prev)}>
			<div></div>
			<div></div>
			<div></div>
		</button>
	)
}
