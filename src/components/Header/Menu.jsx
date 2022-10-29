import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom';
import css from './Menu.module.scss'

import { gsap_openMenu, gsap_closeMenu } from './animations';
import { getRoutes } from '../../hooks/getRoutes'
import { CanvasHandler } from './canvasHandler';

import { gsap } from "gsap";



export const Menu = ({ headerRef, isMenuOpen }) => {
	const [canvas, setCavnas] = useState(null)

	let menuRef = useRef(null)
	let containerRef = useRef(null)
	let canvasRef = useRef(null)

	useEffect(() => {
		isMenuOpen ? gsap_openMenu(menuRef, containerRef) : gsap_closeMenu(menuRef, containerRef)
	}, [isMenuOpen])

	useEffect(() => setCavnas(new CanvasHandler({
		root: headerRef.current,
		canvas: canvasRef.current,
		fill: ['#87dceb', '#879eeb', '#9070d0'],
		arcRadius: 40,
		arcBlur: 80
	})), [])

	return (
		<nav className={css.nav} ref={el => menuRef = el}>
			<div className={css.navContainer} ref={el => containerRef = el}>
				<div className={css.navCanvasBg}>
					<canvas className={css.navCanvas} ref={canvasRef}></canvas>
				</div>
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