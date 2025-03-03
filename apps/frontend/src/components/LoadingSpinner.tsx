import { Loader2 } from 'lucide-react'

interface LoadingSpinnerProps {
	message?: string
	className: string
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ message, className }) => {
	return (
		<div className={`flex flex-col items-center justify-center ${className}`}>
			<Loader2 className='animate-spin text-pink-300' size={32} />
			{message && <p className='mt-3 text-pink-200 text-sm font-medium'>{message}</p>}
		</div>
	)
}
