import { Home } from '../pages/Home'
import { AboutUs } from '../pages/AboutUs'
import { Portfolio } from '../pages/Portfolio'
import { Contact } from '../pages/Contact'

export const getRoutes = () => [
	{ path: '/', Component: Home, title: 'Home', img: 'https://images.pexels.com/photos/9829615/pexels-photo-9829615.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
	{ path: '/aboutus', Component: AboutUs, title: 'About us', img: 'https://images.pexels.com/photos/8657665/pexels-photo-8657665.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
	{ path: '/portfolio', Component: Portfolio, title: 'Portfolio', img: 'https://images.pexels.com/photos/11592813/pexels-photo-11592813.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
	{ path: '/contact', Component: Contact, title: 'Contact', img: 'https://images.pexels.com/photos/9888656/pexels-photo-9888656.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
]
