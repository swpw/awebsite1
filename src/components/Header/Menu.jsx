import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom';
import css from './Menu.module.scss'

import { gsap_openMenu, gsap_closeMenu } from './animations';
import { getRoutes } from '../../hooks/getRoutes'
import { CanvasHandler } from './canvasHandler';
import { romanize } from '../../hooks/romanize'
import { getSocials } from '../../hooks/getSocials'

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
				<ul className={css.imgList}>
					<li className={css.imgItem}>
						<img className={css.img} src="https://images.pexels.com/photos/10413262/pexels-photo-10413262.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
					</li>
				</ul>

				<div className={css.navWrapper}>
					<div className={css.contactWrapper}>
						<address className={css.physicalAddress}>
							<ul>
								<li>
									<a className={css.addressLink} href="mailto:contact@company.com">contact@company.com</a>
								</li>
								<li>
									<a className={css.addressLink} href="tel:(503) 874-6487">(503) 874-6487</a>
								</li>
								<li>
									<p className={css.addressText}>74th E Brighton Woods St, Ste 1293<br />New York, NY 12013, USA</p>
								</li>
							</ul>
						</address>
						<address className={css.socialAddress}>
							<ul>
								{
									getSocials().map(({ title, url, icon }) => (
										<li key={title}>
											<a href={url}>
												<img src={icon} />
											</a>
										</li>
									))
								}
							</ul>
						</address>
					</div>
					<ul className={css.linkList}>
						{
							getRoutes().map(({ path, Component: { name }, title }, index) => (
								<li className={css.linkItem} key={name}>
									<Link data-index={romanize(index + 1)} className={css.link} to={path}>{title}</Link>
								</li>
							))
						}
					</ul>
				</div>

			</div>
		</nav>
	)
}