import type { IPublicSecret } from '@/pages/CreateSecret'
import { Clock, Globe } from 'lucide-react'
interface PublicSecretsProofProps {
	publicSecrets: IPublicSecret[]
}

export const PublicSecretsProof: React.FC<PublicSecretsProofProps> = ({
	publicSecrets,
}): React.ReactNode => {
	return (
		<div className='bg-white/10 rounded-xl shadow-2xl h-min overflow-hidden p-6 md:col-start-5 md:col-end-7 self-center hover:scale-105 transition-all duration-200'>
			<div className='flex items-center justify-between mb-4'>
				<h3 className='text-xl font-medium flex items-center whitespace-nowrap'>
					<Globe className='w-5 h-5 mr-2' />
					Public Secrets
				</h3>
				<span className='bg-pink-500/20 text-pink-200 text-xs px-2 py-1 rounded-full'>Live</span>
			</div>

			<div className='space-y-4 max-h-[500px] overflow-y-auto pr-2'>
				{publicSecrets.map((secret) => (
					<div key={secret.id} className='bg-white/10 p-4 rounded-lg'>
						<p className='text-sm mb-2 line-clamp-2 text-ellipsis whitespace-pre-wrap break-words'>
							{secret.secret}
						</p>
						<div className='flex items-center text-xs text-pink-300/70'>
							<Clock className='w-3 h-3 mr-1' />
							{secret.difference}
						</div>
					</div>
				))}
			</div>
		</div>
	)
}
