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
	const [isNewFirstImgEntry, setIsNewFirstImgEntry] = useState(null)

	let menuRef = useRef(null)
	let containerRef = useRef(null)
	let canvasRef = useRef(null)
	let imgListRef = useRef(null)
	let contactWrapperRef = useRef(null)
	let linksListRef = useRef(null)

	const linksEnterHandler = (e) => {
		console.log(e)
		const current = e.currentTarget

		const links = [...linksListRef.current.querySelectorAll('a')]
		const excludedLinks = links
			.map(el => el.getAttribute('data-index') !== current.getAttribute('data-index') && el)
			.filter(el => el !== false)

		// [ul children].indexOf(li)
		const imgIndex = [...current.parentNode.parentNode.children].indexOf(current.parentNode)


		/*
		SPRAWDZIĆ CZY TO JEST PIERWSZE NAJECHANIE NA JAKIKOLWIEK LINK CZY
		PRZECHODZI ON Z POPRZEDNIEGO LINKU:

			JEŚLI JEST TO PIERWSZE TO:
				WYŁĄCZYĆ:
					wszystkie linki oprócz tego, który jest aktywny(mouseenter)
					sekcja kontaktowa z lewego dolnego rogu
					animacje tła w tle na ruszanie myszki
				WŁĄCZYĆ:
					animacje przejścia zdjęcia - type1 aka 'Clip path'
				USTAWIĆ:
					state isNewFirstImgEntry jako taki, który dostał już
						pierwsze wejśćie, a każde inne będzie przenosiło do
						stanu KOLEJNEGO PRZEJŚCIA (state = 1)

			JEŚLI JEST TO KOLEJNE PRZEJŚCIE TO
				WŁĄCZYĆ:
					animacja przejścia między jednym a drugim zdjęciem - type2 aka 'Opacity / Blur'
				
				JEŚLI CZĘŚĆ KONTENTU ZOSTAŁA JUŻ WŁĄCZONA (timeout 1s state):
				(ustawić jakiś generalnie state na kontrolowanie tego dla prostoty i czytelnosci)
					WYŁĄCZYĆ
						wyłączyć ponownie kontent który został odkryty

				ZMIENIĆ:
					usunąć timeout z linksLeaveHandler
		*/

		// console.log(e, excludedLinks, imgIndex)
	}

	const linksLeaveHandler = e => {
		/*
		USTAWIĆ TIMEOUT NA DAJMY NA TO 2 SEKUNDY:
			PO UPŁYWIE CZASU:
				1 SEKUNDA:
					WŁĄCZYĆ:
						wszystkie linki oprócz tego, który jest aktywny(mouseenter) bo już jest aktywny duuh
						sekcja kontaktowa z lewego dolnego rogu
				2 SEKUNDY:
					WŁĄCZYĆ:
						animacje tła w tle na ruszanie myszki
					WYŁĄCZYĆ:
						aktywne zdjęcie - type1 ala 'Clip path
		 */
	}

	const linksListLeaveHandler = e => {
		/*
		NATYCHMIASTOWO:
			WŁĄCZYĆ:
						wszystkie linki oprócz tego, który jest aktywny(mouseenter) bo już jest aktywny duuh
						sekcja kontaktowa z lewego dolnego rogu
						animacje tła w tle na ruszanie myszki
			WYŁĄCZYĆ:
				aktywne zdjęcie - type1 ala 'Clip path
				timeout z linksLeaveHandler'a
			USTAWIĆ:
					state isNewFirstImgEntry jako taki, który może dostać
						ponownie pierwsze wejście (state = 0)
		*/
	}

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

	useEffect(() => {
		const links = [...linksListRef.current.querySelectorAll('a')]

		links.forEach(el => {
			el.addEventListener('mouseleave', linksLeaveHandler)
			el.addEventListener('mouseenter', linksEnterHandler)
		})

		linksListRef.current.addEventListener('mouseleave', linksListLeaveHandler)
	}, [])

	return (
		<nav className={css.nav} ref={el => menuRef = el}>
			<div className={css.navContainer} ref={el => containerRef = el}>
				<div className={css.navCanvasBg}>
					<canvas className={css.navCanvas} ref={canvasRef}></canvas>
				</div>
				<ul className={css.imgList} ref={imgListRef}>
					{
						getRoutes().map(({ Component: { name }, img }) => (
							<li className={css.imgItem} key={name}>
								<img className={css.img} src={img} />
							</li>
						))
					}
				</ul>

				<div className={css.navWrapper}>
					<div className={css.contactWrapper} ref={contactWrapperRef}>
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
					<ul className={css.linkList} ref={linksListRef}>
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