import { Home } from '../pages/Home'
import { Contact } from '../pages/Contact'

export const getRoutes = () => [
	{ path: '/', Component: Home },
	{ path: '/contact', Component: Contact },
]
