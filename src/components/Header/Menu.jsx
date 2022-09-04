import { useEffect, useRef } from 'react'
import css from './Menu.module.scss'

import { gsap_openMenu, gsap_closeMenu } from './animations';



export const Menu = ({ isMenuOpen }) => {
	let menuRef = useRef(null)

	useEffect(() => {
		isMenuOpen ? gsap_openMenu(menuRef) : gsap_closeMenu(menuRef)
	}, [isMenuOpen])

	return (
		<nav className={css.nav} ref={el => menuRef = el}>

		</nav>
	)
}
