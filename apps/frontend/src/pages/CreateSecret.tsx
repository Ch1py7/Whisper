import { PublicSecretsProof } from '@/components/PublicSecretsProof'
import { SecretForm } from '@/components/SecretForm'
import { Lock } from 'lucide-react'

export const CreateSecret: React.FC = (): React.ReactNode => {
	return (
		<main className='mx-auto px-4 py-12 flex flex-col justify-center'>
			<div className='text-center mb-12'>
				<div className='flex justify-center mb-4'>
					<Lock className='w-16 h-16 text-pink-300' />
				</div>
				<h1 className='text-4xl md:text-5xl font-bold mb-2'>Whisper</h1>
				<p className='text-xl text-pink-200'>Share secrets anonymously, securely.</p>
			</div>

			<div className='grid grid-cols-1 md:grid-cols-6 max-w-4xl mx-auto gap-4'>
				<SecretForm />
				<PublicSecretsProof />
			</div>
		</main>
	)
}
