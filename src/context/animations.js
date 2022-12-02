import { gsap, Power3, Bounce } from "gsap";
import { CSSRulePlugin } from "gsap/CSSRulePlugin";

gsap.registerPlugin(CSSRulePlugin);

export const loaderAnimation = ({ loader }) => {
	gsap.set(loader, { display: 'flex' })
	gsap.set(['html', 'body'], { overflow: 'hidden' })
	console.log(1)
}

export const closeLoaderAnimation = ({ setLoader, loader }) => {
	gsap.set(loader, { display: 'none' })
	gsap.set(['html', 'body'], { overflow: 'visible' })

	setLoader(true)
	console.log(2)
}