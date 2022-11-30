import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom';
import css from './Menu.module.scss'

import { gsap_openMenu, gsap_closeMenu, enterLinkFirst, enterLinkNth, leaveLink, leaveLinkTimeout, leaveLinkList } from './animations';
import { getRoutes } from '../../hooks/getRoutes'
import { CanvasHandler } from './canvasHandler';
import { romanize } from '../../hooks/romanize'
import { getSocials } from '../../hooks/getSocials'

import { gsap } from "gsap";



export const Menu = ({ headerRef, isMenuOpen }) => {
	const [canvas, setCavnas] = useState(null)
	const [pauseCanvas, setPauseCanvas] = useState(true)
	const [offsetImage, setOffsetImage] = useState(null)
	const [linkEntry, setLinkEntry] = useState({
		eventType: null, // enter link, leave link, leave list
		nthEntry: null, // 0 = first entry, 1 = second entry
		target: null
	})
	const [linkTimeout, setLinkTimeout] = useState(null)

	let menuRef = useRef(null)
	let containerRef = useRef(null)
	let canvasRef = useRef(null)
	let imgListRef = useRef(null)
	let contactWrapperRef = useRef(null)
	let linksListRef = useRef(null)
	let links = React.useRef(null)
	let mailRef = React.useRef(null)
	let phoneRef = React.useRef(null)
	let addressRef = React.useRef(null)
	let socialsListRef = React.useRef(null)

	useEffect(() => {
		const elements = {
			menu: menuRef,
			container: containerRef,
			links_list: linksListRef,
			link_itemName: css.linkItem,
			link_name: css.link,
			link_spanIndex: css.linkIndex,
			link_spanName: css.linkSpan,
			mail: mailRef,
			phone: phoneRef,
			address: addressRef,
			socials: socialsListRef,
		}

		isMenuOpen.state ? gsap_openMenu(elements) : gsap_closeMenu(elements)
	}, [isMenuOpen])

	useEffect(() => setCavnas(new CanvasHandler({
		root: headerRef.current,
		canvas: canvasRef.current,
		fill: ['#0e1529', '#221a2a', '#2c1f0f'],
		arcRadius: 40,
		arcBlur: 80,
		pauseCanvas
	})), [])

	useEffect(() => {
		if (canvas) canvas.setPauseCanvas = pauseCanvas
	}, [pauseCanvas])

	useEffect(() => {
		links.current = [...linksListRef.querySelectorAll('a')]

		const linkEnterEventHandler = ({ currentTarget: target }) => {
			setLinkEntry(prev => ({
				eventType: 'enter',
				nthEntry: prev.nthEntry === null ? 0 : 1,
				target
			}))
		}

		const linkLeaveEventHandler = ({ currentTarget: target }) => {
			setLinkEntry(prev => ({
				eventType: 'leave-link',
				nthEntry: prev.nthEntry,
				target
			}))
		}

		const linkListLeaveEventHandler = ({ currentTarget: target }) => {
			setLinkEntry(prev => ({
				eventType: 'leave-list',
				nthEntry: null,
				target
			}))
		}

		links.current.forEach(el => {
			el.addEventListener('mouseenter', linkEnterEventHandler)
			el.addEventListener('mouseleave', linkLeaveEventHandler)
		})

		linksListRef.addEventListener('mouseleave', linkListLeaveEventHandler)

		// Unmount (prevents double event mount via react 18)
		return (() => {
			links.current &&
				links.current.forEach(el => {
					el.removeEventListener('mouseenter', linkEnterEventHandler)
					el.removeEventListener('mouseleave', linkLeaveEventHandler)
				})

			linksListRef &&
				linksListRef.removeEventListener('mouseleave', linkListLeaveEventHandler)
		})
	}, [linksListRef])

	useEffect(() => {
		linkEntry.eventType === 'enter' && linkEnterHandler()
		linkEntry.eventType === 'leave-link' && linkLeaveHandler()
		linkEntry.eventType === 'leave-list' && linkListLeaveHandler()
	}, [linkEntry])

	function linkEnterHandler() {
		const current = linkEntry.target

		const excludedLinks = links.current.map(el =>
			el.getAttribute('data-index') !== current.getAttribute('data-index') && el)
			.filter(el => el !== false)

		// [ul children].indexOf(li) // Index of entered link
		const imgIndex = [...current.parentNode.parentNode.children].indexOf(current.parentNode)

		if (linkEntry.nthEntry === 0) {
			enterLinkFirst({
				activeLink: current,
				linkList: links.current,
				excludedLinks: excludedLinks,
				linkSpanIndex: css.linkIndex,
				linkSpanName: css.linkSpan,
				imgList: imgListRef,
				activeImg: imgListRef.querySelectorAll('img')[imgIndex],
				mail: mailRef,
				phone: phoneRef,
				address: addressRef,
				socials: socialsListRef
			})

			setPauseCanvas(false)
		} else {
			clearTimeout(linkTimeout)
			setLinkTimeout(null)

			enterLinkNth({
				// TODO ANIMATION
			})
		}
	}

	function linkLeaveHandler() {
		const current = linkEntry.target

		const excludedLinks = links.current.map(el =>
			el.getAttribute('data-index') !== current.getAttribute('data-index') && el)
			.filter(el => el !== false)

		// [ul children].indexOf(li) // Index of entered link
		const imgIndex = [...current.parentNode.parentNode.children].indexOf(current.parentNode)

		const imgTemp = imgListRef.querySelectorAll('img')[imgIndex]

		leaveLink({
			activeLink: current,
			excludedLinks: excludedLinks,
			activeImg: imgTemp
		})

		const timeout = setTimeout(() => {
			setPauseCanvas(true)
			setLinkTimeout(null)

			leaveLinkTimeout({
				// TODO ANIMATION
			})
		}, 2000)

		setLinkTimeout(timeout)
	}

	function linkListLeaveHandler() {
		if (linkTimeout !== null) {
			clearTimeout(linkTimeout)
			setLinkTimeout(null)
		}

		setPauseCanvas(true)

		const current = linkEntry.target

		const excludedLinks = links.current.map(el =>
			el.getAttribute('data-index') !== current.getAttribute('data-index') && el)
			.filter(el => el !== false)

		leaveLinkList({
			// TODO ANIMATION
		})
	}

	const data_mail = 'contact@company.com'
	const data_phone = '(503) 874-6487'
	const data_address = [
		'74th E Brighton Woods St, Ste 1293',
		'New York, NY 12013, USA'
	]

	return (
		<nav className={css.nav} ref={el => menuRef = el}>
			<div className={css.navContainer} ref={el => containerRef = el}>
				<div className={css.navCanvasBg}>
					<canvas className={css.navCanvas} ref={canvasRef}></canvas>
				</div>
				<ul className={css.imgList} ref={el => imgListRef = el}>
					{
						getRoutes().map(({ Component: { name }, img }) => (
							<li className={css.imgItem} key={name}>
								<img className={css.img} src={img} />
							</li>
						))
					}
				</ul>

				<div className={css.navWrapper}>
					<div className={css.contactWrapper} ref={el => contactWrapperRef = el}>
						<address className={css.physicalAddress}>
							<ul>
								<li>
									<a className={css.addressLink} href="mailto:contact@company.com" ref={el => mailRef = el}>
										<span className={css.mailLinkSpan} data-text={data_mail}>{data_mail}</span>
									</a>
								</li>
								<li>
									<a className={css.addressLink} href="tel:(503) 874-6487" ref={el => phoneRef = el}>
										<span className={css.phoneLinkSpan} data-text={data_phone}>{data_phone}</span>
									</a>
								</li>
								<li>
									<p className={css.addressText} ref={el => addressRef = el}>
										<span className={css.addressLinkSpan} data-text={data_address[0]}>{data_address[0]}</span>
										<span className={css.addressLinkSpan} data-text={data_address[1]}>{data_address[1]}</span>
									</p>
								</li>
							</ul>
						</address>
						<address className={css.socialAddress} ref={el => socialsListRef = el}>
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
					<ul className={css.linkList} ref={el => linksListRef = el}>
						{
							getRoutes().map(({ path, Component: { name }, title }, index) => (
								<li className={css.linkItem} key={name}>
									<Link data-index={index + 1} className={css.link} to={path}>
										<span className={css.linkIndex}>{romanize(index + 1)}</span>
										<span className={css.linkSpanWrapper}>
											<span data-text={title} className={css.linkSpan}>{title}</span>
										</span>
									</Link>
								</li>
							))
						}
					</ul>
				</div>

			</div>
		</nav>
	)
}