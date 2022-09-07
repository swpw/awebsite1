import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom';
import css from './Menu.module.scss'

import { gsap_openMenu, gsap_closeMenu } from './animations';
import { getRoutes } from '../../hooks/getRoutes'


export const Menu = ({ isMenuOpen }) => {
	let menuRef = useRef(null)

	useEffect(() => {
		isMenuOpen ? gsap_openMenu(menuRef) : gsap_closeMenu(menuRef)
	}, [isMenuOpen])

	return (
		<nav className={css.nav} ref={el => menuRef = el}>
			<ul>
				{
					getRoutes().map(({ path, Component: { name } }) => (
						<li key={name}>
							<Link to={path}>{name}</Link>
						</li>
					))
				}
			</ul>
		</nav>
	)
}
