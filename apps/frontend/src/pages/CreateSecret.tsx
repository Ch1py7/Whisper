import { PublicSecretsProof } from '@/components/PublicSecretsProof'
import { SecretForm } from '@/components/SecretForm'
import { getRequest } from '@/services/requests'
import { getTimeDifference } from '@/utils/common'
import { Lock } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'

interface Response {
	data: PublicSecret[]
	message: string
}

export interface IPublicSecret {
	id: string
	secret: string
	difference: string
}

const uriPublicSecrets = `${import.meta.env.VITE_BACKEND_URL}/public`

export const CreateSecret: React.FC = (): React.ReactNode => {
	const [publicSecrets, setPublicSecrets] = useState<IPublicSecret[]>([])

	const getSecrets = useCallback(async () => {
		const { response, status } = await getRequest<Response>(`${uriPublicSecrets}?limit=3`)
		if (status === 200) {
			const secrets = response.data.map((secret) => ({
				id: secret.id,
				secret: secret.secret,
				difference: getTimeDifference(secret.createdAt),
			}))
			setPublicSecrets(secrets)
		}
	}, [])

	useEffect(() => {
		getSecrets()
	}, [getSecrets])
	return (
		<main className='mx-auto px-4 py-12 flex flex-col justify-center'>
			<div className='text-center mb-12'>
				<div className='flex justify-center mb-4'>
					<Lock className='w-16 h-16 text-pink-300' />
				</div>
				<h1 className='text-4xl md:text-5xl font-bold mb-2'>Whisper</h1>
				<p className='text-xl text-pink-200'>Share secrets anonymously, securely.</p>
			</div>

			<div className='flex justify-center'>
				<div className='grid grid-cols-1 md:grid-cols-6 max-w-4xl gap-4 w-full'>
					<SecretForm getSecrets={getSecrets} />
					<PublicSecretsProof publicSecrets={publicSecrets} />
				</div>
			</div>
		</main>
	)
}
