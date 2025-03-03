import { LoadingSpinner } from './LoadingSpinner'

interface LoadingScreenProps {
	title?: string
	message?: string
	icon?: React.ReactNode
	className?: string
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({
	title = 'Loading',
	message = 'Please wait...',
	icon,
	className = '',
}) => {
	return (
		<div className={`p-12 text-center ${className}`}>
			<div className='inline-flex items-center justify-center w-16 h-16 bg-purple-500/20 rounded-full mb-4'>
				{icon || <LoadingSpinner className='' message='' />}
			</div>
			<h2 className='text-2xl font-bold mb-2'>{title}</h2>
			<p className='text-pink-200'>{message}</p>
		</div>
	)
}
