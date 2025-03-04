import { SecretForm } from '@/components/SecretForm'
import { toasty } from '@/libs/toast'
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

const urlPublicSecrets = `${import.meta.env.VITE_BACKEND_URL}/public`

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

			<div className='flex justify-center'>
				<div className='max-w-2xl gap-4 w-full'>
					<SecretForm />
				</div>
			</div>
		</main>
	)
}
