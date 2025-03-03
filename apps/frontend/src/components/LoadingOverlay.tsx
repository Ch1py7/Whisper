import { LoadingSpinner } from './LoadingSpinner'

interface LoadingOverlayProps {
	isLoading: boolean
	message?: string
	children: React.ReactNode
	className?: string
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
	isLoading,
	message,
	children,
	className = '',
}): React.ReactNode => {
	if (!isLoading) return <>{children}</>

	return (
		<div className={`relative ${className}`}>
			<div className='absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-10 rounded-lg'>
				<LoadingSpinner className={className} message={message} />
			</div>
			<div className='opacity-50 pointer-events-none'>{children}</div>
		</div>
	)
}
