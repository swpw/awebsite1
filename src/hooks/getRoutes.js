import { Home } from '../pages/Home'
import { AboutUs } from '../pages/AboutUs'
import { Portfolio } from '../pages/Portfolio'
import { Contact } from '../pages/Contact'

export const getRoutes = () => [
	{ path: '/', Component: Home, title: 'Home', img: '' },
	{ path: '/aboutus', Component: AboutUs, title: 'About us', img: '' },
	{ path: '/portfolio', Component: Portfolio, title: 'Portfolio', img: '' },
	{ path: '/contact', Component: Contact, title: 'Contact', img: '' },
]
