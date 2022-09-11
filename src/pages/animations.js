import { gsap, Power3 } from "gsap";

export const gsap_translateRoot = ({ current: target }, state) => {
	state && gsap.to(target, {
		x: '-20vw',
		duration: .5,
		ease: Power3.easeInOut,
	})

	!state && gsap.timeline()
		.to(target, {
			x: 0,
			duration: .5,
			delay: .2,
			ease: Power3.easeInOut,
		})
		.to(target, {
			duration: 0,
			clearProps: 'all',
		})

}