import { gsap, Power3 } from "gsap";

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