import { Clock, Globe } from 'lucide-react'
import { useState } from 'react'

const testData = [
	{
		text: "I've been pretending to like coffee for years just to fit in.",
		timestamp: '2 hours ago',
	},
	{
		text: 'Sometimes I wear headphones with nothing playing just to avoid conversations.',
		timestamp: '5 hours ago',
	},
	{ text: "I still sleep with my childhood teddy bear. I'm 34.", timestamp: '1 day ago' },
]

export const PublicSecretsProof: React.FC = (): React.ReactNode => {
	const [publicSecrets, setPublicSecrets] =
		useState<{ text: string; timestamp: string }[]>(testData)
	return (
		<div className='bg-white/10 rounded-xl shadow-2xl overflow-hidden p-6 md:col-start-5 md:col-end-7'>
			<div className='flex items-center justify-between mb-4'>
				<h3 className='text-xl font-medium flex items-center whitespace-nowrap'>
					<Globe className='w-5 h-5 mr-2' />
					Public Secrets
				</h3>
				<span className='bg-pink-500/20 text-pink-200 text-xs px-2 py-1 rounded-full'>Live</span>
			</div>

			<div className='space-y-4 max-h-[500px] overflow-y-auto pr-2'>
				{publicSecrets.map((secret, index) => (
					<div key={index} className='bg-white/10 p-4 rounded-lg'>
						<p className='text-sm mb-2 line-clamp-2 text-ellipsis whitespace-pre-wrap break-words'>
							{secret.text}
						</p>
						<div className='flex items-center text-xs text-pink-300/70'>
							<Clock className='w-3 h-3 mr-1' />
							{secret.timestamp}
						</div>
					</div>
				))}
			</div>
		</div>
	)
}
