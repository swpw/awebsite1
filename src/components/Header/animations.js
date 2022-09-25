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

export const gsap_openMenu = (menu, container) => {
	gsap.timeline()
		.to(['body', 'html'], {
			css: { overflow: 'hidden' },
			duration: 0,
		})
		.fromTo([menu, container], {
			autoAlpha: 1,
			clipPath: 'inset(0% 0% 0% 100%)',
		}, {
			clipPath: 'inset(0% 0% 0% 0%)',
			duration: .75,
			stagger: .15,
			ease: Power3.easeInOut
		})
}

export const gsap_closeMenu = (menu, container) => {
	gsap.timeline()
		.to([menu, container], {
			clipPath: 'inset(0% 0% 0% 100%)',
			duration: .75,
			stagger: -.15,
			ease: Power3.easeInOut
		})
		.to(['body', 'html'], {
			css: { overflow: 'hidden' },
			duration: 0,
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