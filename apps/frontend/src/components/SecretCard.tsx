import { getTimeDifference } from '@/utils/common'
import type React from 'react'
import { forwardRef } from 'react'

interface SecretCardProps extends PublicSecret {
	ref?: React.RefObject<HTMLDivElement>
}

export const SecretCard = forwardRef<HTMLDivElement, SecretCardProps>(
	({ secret, createdAt }, ref) => {
		return (
			<div
				ref={ref}
				className='bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-indigo-400/30 transition shadow-lg'
			>
				<p className='text-lg mb-4'>{secret}</p>

				<div className='flex justify-between items-center'>
					<div className='flex items-center space-x-3'>
						<span className='text-sm text-indigo-300'>{getTimeDifference(createdAt, true)}</span>

						{/* <button type='button' className='text-indigo-300 hover:text-white transition'>
							<Share2 size={18} />
						</button> */}
					</div>
				</div>
			</div>
		)
	}
)

SecretCard.displayName = 'SecretCard'
