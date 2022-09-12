import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom';
import css from './Menu.module.scss'

import { gsap_openMenu, gsap_closeMenu } from './animations';
import { getRoutes } from '../../hooks/getRoutes'

import { gsap } from "gsap";



export const Menu = ({ isMenuOpen }) => {
	let menuRef = useRef(null)
	let containerRef = useRef(null)

	useEffect(() => {
		isMenuOpen ? gsap_openMenu(menuRef, containerRef) : gsap_closeMenu(menuRef, containerRef)
	}, [isMenuOpen])

	return (
		<nav className={css.nav} ref={el => menuRef = el}>
			<div className={css.navContainer} ref={el => containerRef = el}>
				<ul>
					{
						getRoutes().map(({ path, Component: { name } }) => (
							<li key={name}>
								<Link to={path}>{name}</Link>
							</li>
						))
					}
				</ul>
			</div>
		</nav>
	)
}