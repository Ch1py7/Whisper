import { Heart } from 'lucide-react'

export const Footer: React.FC = (): React.ReactNode => {
	return (
		<div className='flex justify-center py-6'>
			Made with
			<Heart
				className='mx-2 text-[#f00] transition-all duration-200 ease-in-out hover:scale-125 hover:drop-shadow-[0_0_2px_#f00]'
				fill='#f00'
			/>
			by Gerardo Garcia
		</div>
	)
}
