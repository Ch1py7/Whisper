import { Lock } from 'lucide-react'
import { Link } from 'react-router-dom'

export const Header: React.FC = (): React.ReactNode => {
	return (
		<header className='bg-black/30 border-b border-white/10'>
			<div className='container mx-auto px-4 py-4'>
				<div className='flex justify-between items-center'>
					<a href='/' className='flex items-center'>
						<Lock className='text-indigo-400 mr-2' size={24} />
						<span className='text-xl font-bold'>Whisper</span>
					</a>
					<nav>
						<ul className='flex space-x-6'>
							<li>
								<Link to='/' className='text-indigo-200 hover:text-white transition'>
									Create
								</Link>
							</li>
							<li>
								<Link to='/secrets' className='text-indigo-200 hover:text-white transition'>
									Public secrets
								</Link>
							</li>
						</ul>
					</nav>
				</div>
			</div>
		</header>
	)
}
