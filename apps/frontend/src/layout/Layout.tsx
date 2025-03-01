import { Footer } from './Footer'
import { Header } from './Header'

interface LayoutProps {
	children: React.ReactNode
}

export const Layout: React.FC<LayoutProps> = ({ children }): React.ReactNode => {
	return (
		<div className='min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 text-white'>
			<Header />
			{children}
			<Footer />
		</div>
	)
}
