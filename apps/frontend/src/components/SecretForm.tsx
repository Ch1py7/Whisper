import { toasty } from '@/libs/toast'
import { postRequest } from '@/services/requests'
import { AxiosError } from 'axios'
import { Globe, RefreshCw, Send, Shield } from 'lucide-react'
import { useState } from 'react'
import { LoadingOverlay } from './LoadingOverlay'
import { CreatePrivateSecret } from './CreatePrivateSecret'

const urlPublicSecrets = `${import.meta.env.VITE_BACKEND_URL}/public`
const urlPrivateSecrets = `${import.meta.env.VITE_BACKEND_URL}/private`

interface ResponsePublic {
	data: PublicSecret[]
	message: string
}

interface ResponsePrivate {
	data: {
		iv: string
		secretId: string
	}
	message: string
}

interface SecretFormProps {
	getSecrets: () => Promise<void>
}

const maxChars = 280

export const SecretForm: React.FC<SecretFormProps> = ({ getSecrets }): React.ReactNode => {
	const [secret, setSecret] = useState('')
	const [secretLink, setSecretLink] = useState('')
	const [decryptKey, setDecryptKey] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const [shareMode, setShareMode] = useState<'private' | 'public'>('private')
	const [charCount, setCharCount] = useState(0)

	const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const text = e.target.value
		if (text.length <= maxChars) {
			setSecret(text)
			setCharCount(text.length)
		}
	}

	const resetForm = () => {
		setSecret('')
		setSecretLink('')
		setCharCount(0)
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		if (!secret.trim()) return
		setIsLoading(true)

		try {
			const { response, status } =
				shareMode === 'public'
					? await postRequest<ResponsePrivate>(urlPublicSecrets, { secret })
					: await postRequest<ResponsePrivate>(urlPrivateSecrets, { secret, maxAttempts: 3 })
			if (status === 201) {
				if (shareMode === 'public') {
					getSecrets()
				} else {
					setSecretLink(`${window.location}secret/${response.data.secretId}`)
					setDecryptKey(response.data.iv)
				}
				setSecret('')
				setCharCount(0)
				toasty.success(response.message)
			}
		} catch (er) {
			if (er instanceof AxiosError && er.response?.data) {
				toasty.error(er.response.data.message)
			} else {
				toasty.error('An unexpected error occurred. Please try again later.')
			}
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<div className='gap-6 md:col-start-1 md:col-end-5'>
			<div className='lg:col-span-2 bg-white/10 rounded-xl shadow-2xl overflow-hidden h-full '>
				<div className='p-6 md:p-8 h-full'>
					{!secretLink || shareMode === 'public' ? (
						<LoadingOverlay isLoading={isLoading} message='Processing your secret...'>
							<form onSubmit={handleSubmit} className='space-y-6'>
								<div className='flex justify-center space-x-4 mb-6'>
									<button
										type='button'
										onClick={() => setShareMode('private')}
										className={`flex items-center px-4 py-2 rounded-lg transition-all ${
											shareMode === 'private'
												? 'bg-pink-500 text-white'
												: 'bg-white/20 hover:bg-white/30'
										}`}
									>
										<Shield className='w-5 h-5 mr-2' />
										Private Link
									</button>
									<button
										type='button'
										onClick={() => setShareMode('public')}
										className={`flex items-center px-4 py-2 rounded-lg transition-all ${
											shareMode === 'public'
												? 'bg-pink-500 text-white'
												: 'bg-white/20 hover:bg-white/30'
										}`}
									>
										<Globe className='w-5 h-5 mr-2' />
										Public Share
									</button>
								</div>

								<div>
									<div className='flex items-center justify-between'>
										<label htmlFor='secret' className='block text-lg font-medium mb-2'>
											Your Secret
										</label>
										<div
											className={`block text-md font-medium mb-2 ${charCount > maxChars * 0.8 ? 'text-yellow-300' : 'text-indigo-200'}`}
										>
											{charCount}/{maxChars} characters
										</div>
									</div>
									<div className='relative'>
										<textarea
											id='secret'
											value={secret}
											style={{ resize: 'none' }}
											onChange={handleChange}
											placeholder={
												shareMode === 'private'
													? 'Type your secret here...'
													: 'Share your secret with the world!'
											}
											className='w-full h-40 px-4 py-3 bg-white/20 border border-purple-300/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 text-white placeholder-pink-200/70'
											required
										/>
									</div>
									<p className='mt-2 text-sm text-pink-200'>
										{shareMode === 'private'
											? 'Your secret will be encrypted and available for a single view only.'
											: 'Your secret will be shared anonymously with everyone using Whisper.'}
									</p>
								</div>

								<button
									type='submit'
									disabled={isLoading || !secret.trim()}
									className={`w-full flex items-center justify-center py-3 px-6 rounded-lg text-lg font-medium transition-all duration-300 ${
										isLoading || !secret.trim()
											? 'bg-purple-700/50 cursor-not-allowed'
											: 'bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 shadow-lg hover:shadow-xl'
									}`}
								>
									{isLoading ? (
										<>
											<RefreshCw className='w-5 h-5 mr-2 animate-spin' />
											{shareMode === 'private' ? 'Creating link...' : 'Sharing...'}
										</>
									) : (
										<>
											<Send className='w-5 h-5 mr-2' />
											{shareMode === 'private' ? 'Create Secret Link' : 'Share Anonymously'}
										</>
									)}
								</button>
							</form>
						</LoadingOverlay>
					) : (
						<CreatePrivateSecret
							decryptKey={decryptKey}
							resetForm={resetForm}
							secretLink={secretLink}
						/>
					)}
				</div>
			</div>
		</div>
	)
}
