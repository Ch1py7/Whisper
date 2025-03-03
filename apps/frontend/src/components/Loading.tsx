import { Loader2 } from 'lucide-react'

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
				<div className={`flex flex-col items-center justify-center ${className}`}>
					<Loader2 className='animate-spin text-pink-300' size={32} />
					{message && <p className='mt-3 text-pink-200 text-sm font-medium'>{message}</p>}
				</div>
			</div>
			<div className='opacity-50 pointer-events-none'>{children}</div>
		</div>
	)
}
