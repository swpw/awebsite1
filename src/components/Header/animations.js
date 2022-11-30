import { gsap, Power3, Bounce } from "gsap";
import { CSSRulePlugin } from "gsap/CSSRulePlugin";

gsap.registerPlugin(CSSRulePlugin);

export const gsap_buttonOpen = (target, time) => {
	gsap.timeline()
		.to(target.children[0], {
			top: 8,
			duration: time,
			ease: Power3.easeOut
		}, 'start')
		.to(target.children[2], {
			bottom: 8,
			duration: time,
			ease: Power3.easeOut
		}, 'start')
		.to(target.children[1], {
			css: { visibility: 'hidden', opacity: 0, },
			duration: 0,
		})
		.to(target.children[0], {
			rotation: 45,
			duration: time,
			ease: Power3.easeOut
		}, 'end')
		.to(target.children[2], {
			rotation: -45,
			duration: time,
			ease: Power3.easeOut
		}, 'end')
}

export const gsap_buttonClose = (target, time) => {
	gsap.timeline()
		.to([target.children[0], target.children[2]], {
			rotation: 0,
			duration: time,
			ease: Power3.easeOut
		})
		.to(target.children[1], {
			css: { visibility: 'visible', opacity: 1, },
			duration: time,
		})
		.to(target.children[0], {
			top: 0,
			duration: time,
			ease: Power3.easeOut
		}, 'end')
		.to(target.children[2], {
			bottom: 0,
			duration: time,
			ease: Power3.easeOut
		}, 'end')
		.to([target.children], {
			duration: 0,
			clearProps: 'all',
		})
}

export const gsap_fouc = target => {
	gsap.to(target, {
		css: { visibility: 'visible' },
		duration: 0,
	})
}

export const gsap_revealHeader = target => {
	gsap.fromTo(target, {
		y: -target.getBoundingClientRect().height,
	}, {
		y: 0,
		duration: .4,
		ease: Power3.easeInOut,
		delay: .4,
	})
}

export const gsap_openMenu = ({ menu, container, links_list, link_itemName, link_name, link_spanIndex, link_spanName, mail, phone, address, socials }) => {
	const links = links_list.querySelectorAll(`.${link_name}`)
	const linksIndex = links_list.querySelectorAll(`.${link_spanIndex}`)
	const linksSpan = links_list.querySelectorAll(`.${link_spanName}`)

	const pseudoLinkMenu = CSSRulePlugin.getRule(`.${link_itemName}:first-child .${link_name}::after`)
	const pseudoLinkSpan = CSSRulePlugin.getRule(`.${link_spanName}::before`)
	const pseudoMailSpan = CSSRulePlugin.getRule(`.${mail.querySelector('span').className}::before`)
	const pseudoPhoneSpan = CSSRulePlugin.getRule(`.${phone.querySelector('span').className}::before`)
	const pseudoAddressSpan = CSSRulePlugin.getRule(`.${address.querySelector('span').className}::before`)

	gsap.set('body', { overflowY: 'scroll', position: 'fixed' })

	const tl = gsap.timeline()
		.fromTo([menu, container], {
			autoAlpha: 1,
			clipPath: 'inset(0% 0% 0% 100%)',
		}, {
			clipPath: 'inset(0% 0% 0% 0%)',
			duration: .75,
			stagger: .15,
			ease: Power3.easeInOut
		}, 'first')
		.fromTo(linksSpan, {
			autoAlpha: 0,
			yPercent: 100,
			rotateZ: 8,
		}, {
			yPercent: 0,
			rotateZ: 0,
			autoAlpha: 1,
			duration: 1,
			stagger: .15,
			ease: Power3.easeInOut
		}, 'first')
		.fromTo(pseudoLinkSpan, {
			clipPath: 'inset(0% 100% 0% 0%)'
		}, {
			clipPath: 'inset(0% 0% 0% 0%)',
			duration: .5,
			ease: Power3.easeInOut
		}, 'second')
		.fromTo(linksIndex, {
			clipPath: 'inset(0% 100% 0% 0%)',
		}, {
			clipPath: 'inset(0% 0% 0% 0%)',
			duration: .6,
			delay: .2,
			ease: Power3.easeInOut
		}, 'second')
		.fromTo(pseudoLinkMenu, {
			clipPath: 'inset(100% 0% 0% 0%)',
		}, {
			clipPath: 'inset(0% 0% 0% 0%)',
			duration: 1,
			delay: .2,
			ease: Power3.easeInOut
		}, 'second')
		.fromTo([mail, phone, address], {
			autoAlpha: 0,
			yPercent: 100,
		}, {
			yPercent: 0,
			autoAlpha: 1,
			duration: 1,
			delay: -.3,
			stagger: .05,
			ease: Power3.easeInOut
		}, 'second')
		.fromTo(socials.querySelectorAll('li'), {
			autoAlpha: 0,
			yPercent: 40,
		}, {
			autoAlpha: 1,
			yPercent: 0,
			duration: .6,
			delay: .1,
			stagger: .03,
			ease: Power3.easeInOut
		}, 'second')

	const addressMicoAnimation = (tl, target, delay = 0) => {
		tl.fromTo(target, {
			clipPath: 'inset(0 100% 0% 0%)',
		}, {
			clipPath: 'inset(0% 0% 0% 0%)',
			duration: .7,
			delay: delay,
			ease: Power3.easeInOut
		}, 'second')
	}

	addressMicoAnimation(tl, pseudoMailSpan)
	addressMicoAnimation(tl, pseudoPhoneSpan, .1)
	addressMicoAnimation(tl, pseudoAddressSpan, .2)
}

export const gsap_closeMenu = ({ menu, container, links_list, link_itemName, link_name, link_spanName }) => {
	gsap.timeline({
		onComplete: () => gsap.set('body', { overflowY: '', position: '' })
	})
		.to([menu, container], {
			clipPath: 'inset(0% 0% 0% 100%)',
			duration: .75,
			stagger: -.15,
			ease: Power3.easeInOut
		})
}

export const gsap_headerLinkHover = ({ timeline: tl, timelinePseudo: tl_pseudo, target }, setSplittedText, kill = false) => {
	const duration = .25,
		delay = index => index * .015,
		ease = Power3.easeInOut

	// Pseudo Element target reference
	const targetPseudo = CSSRulePlugin.getRule(`.${target.splitted.className}::after`)

	if (kill) {
		// Pause previous onMouseEnter animation
		tl.forEach(el => el.pause())
		tl_pseudo.pause()

		// Cancel animation: reverse animation onMouseLeave
		target.chars.forEach((char, index) => {
			gsap.timeline()
				.to(char, {
					y: 0,
					immediateRender: false,
					duration,
					delay: delay(index),
					ease,
				})
		})

		gsap.timeline()
			.to(targetPseudo, {
				cssRule: {
					left: 0,
				},
				immediateRender: false,
				duration: duration + .15,
				ease,
			})

		return
	}

	// 'temp timeline array'
	let tempTlContainer = []
	target.chars.forEach((char, index) => {
		// Main animation
		const charTl = gsap.timeline()
			.fromTo(char, {
				y: 0,
			}, {
				y: -5,
				duration,
				delay: delay(index),
				ease,
			})
			.to(char, {
				y: 0,
				duration,
				ease
			})

		// Add each 'char timeline' to 'temp timeline array'
		tempTlContainer = [...tempTlContainer, charTl]
	})

	/* Animate pseudo element border */
	const pseudoTl = gsap.timeline()
		.to(targetPseudo, {
			cssRule: {
				left: '100%',
			},
			duration,
			ease,
		})
		.fromTo(targetPseudo, {
			left: '-100%',
		}, {
			cssRule: {
				left: 0,
			},
			immediateRender: false,
			duration,
			delay: .15,
			ease,
		})

	// Modify timeline with 'temp timeline array'
	setSplittedText(prev => ({
		timeline: tempTlContainer,
		timelinePseudo: pseudoTl,
		target
	}))
}

export const changeNavColor = ({ state, logo, link, button }) => {
	const border = CSSRulePlugin.getRule(`.${link.className}::after`)

	const color = state ? '#fff' : '#232323'

	const tl = gsap.timeline()
		.fromTo([logo, link], {
			xPercent: 0,
		}, {
			xPercent: 100,
			duration: .5,
			ease: Power3.easeIn,
		}, 'start')
		.to(button.children, {
			background: color,
			delay: () => state ? .2 : .5,
			duration: 0,
			ease: Power3.easeInOut,
		}, 'start')
		.set([logo, link], { color })
		.set(border, { background: color })
		.fromTo([logo, link], {
			xPercent: -100,
		}, {
			xPercent: 0,
			duration: .5,
			ease: Power3.easeOut,
		})
}

export const enterLinkFirst = ({
	activeLink,
	linkList,
	excludedLinks,
	linkSpanIndex,
	linkSpanName,
	imgList,
	activeImg,
	mail,
	phone,
	address,
	socials,
}) => {
	// excludedLinks.
	const indexOfactiveLink = linkList.findIndex((el, i) => el === activeLink && i)
	const inactiveIndexSpans = linkList.map(el => el !== activeLink && el.querySelector(`.${linkSpanIndex}`)).filter(el => el)
	const excludedLinkSpans = linkList.map(el => el !== activeLink && el.querySelector(`.${linkSpanName}`)).filter(el => el)
	const isLastItem = linkList.length - 1 === indexOfactiveLink

	activeLink = activeLink.querySelector(`.${linkSpanName}`)
	const pseudoLinkSpan = CSSRulePlugin.getRule(`.${linkSpanName}::before`)

	// const pseudoLinkIndex = CSSRulePlugin.getRule(`.${link_name}::before`)
	// const pseudoLinkMenu = CSSRulePlugin.getRule(`.${link_itemName}:first-child .${link_name}::after`)

	// const pseudoMailSpan = CSSRulePlugin.getRule(`.${mail.querySelector('span').className}::before`)
	// const pseudoPhoneSpan = CSSRulePlugin.getRule(`.${phone.querySelector('span').className}::before`)
	// const pseudoAddressSpan = CSSRulePlugin.getRule(`.${address.querySelector('span').className}::before`)

	// Links
	const tl = gsap.timeline()
		.set(activeLink, { color: '#fff', zIndex: 2 })
		.set(imgList, { zIndex: 1 })
		.set([inactiveIndexSpans, excludedLinkSpans], { color: 'rgba(255 255 255 / 0.02)' })
		.fromTo(activeLink, {
			yPercent: 0,
		}, {
			yPercent: () => !isLastItem ? 100 : -100,
			duration: .5,
			ease: Power3.easeIn,
		}, 'first')
		.fromTo(activeLink, {
			yPercent: () => !isLastItem ? -100 : 100,
		}, {
			yPercent: 0,
			duration: .5,
			delay: .5,
			ease: Power3.easeOut,
		}, 'first')
		.to(pseudoLinkSpan, {
			clipPath: 'inset(0% 100% 0% 0%)',
			duration: .7,
			ease: Power3.easeInOut
		}, 'first')

	// img
	tl
		.fromTo(imgList, {
			clipPath: () => !isLastItem ? 'inset(0% 0% 100% 0%)' : 'inset(100% 0% 0% 0%)',
		}, {
			clipPath: 'inset(0% 0% 0% 0%)',
			duration: 1,
			ease: Power3.easeInOut,
		}, 'first')
		.fromTo(activeImg, {
			scale: 1.5,
			autoAlpha: 0,
		}, {
			autoAlpha: 1,
			scale: 1,
			duration: 1.3,
			ease: Power3.easeInOut,
		}, 'first')

	// socials
	tl
		.to([mail, phone, address], {
			autoAlpha: 0,
			yPercent: 100,
			duration: 1,
			stagger: .05,
			ease: Power3.easeInOut,
		}, 'first')
		.to(socials, {
			autoAlpha: 0,
			yPercent: 40,
			duration: 1,
			delay: .15,
			stagger: .03,
			ease: Power3.easeInOut,
		}, 'first')
}

export const enterLinkNth = ({ data }) => {
	// gsap.set(excludedLinks, { autoAlpha: 0 })
	// gsap.set(imgListRef.querySelectorAll('img')[imgIndex], { autoAlpha: 1 })
}

export const leaveLink = ({
	activeLink,
	excludedLinks,
	activeImg,
}) => {
	// gsap.set(imgListRef.querySelectorAll('img'), { autoAlpha: 0 })
	// gsap.set([excludedLinks], { autoAlpha: 1 })
}

export const leaveLinkTimeout = ({ data }) => {
	// gsap.set(imgTemp, { autoAlpha: 0 })
	// gsap.set(contactWrapperTemp, { autoAlpha: 1 })
}

export const leaveLinkList = ({ data }) => {
	// gsap.set([excludedLinks], { autoAlpha: 1 })
	// gsap.set(imgListRef.querySelectorAll('img'), { autoAlpha: 0 })
	// gsap.set(contactWrapperRef, { autoAlpha: 1 })
}