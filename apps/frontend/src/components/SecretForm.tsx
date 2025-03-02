import { toasty } from '@/libs/toast'
import { postRequest } from '@/services/requests'
import { AxiosError } from 'axios'
import { Copy, Globe, Lock, RefreshCw, Send, Share2, Shield } from 'lucide-react'
import { useState } from 'react'

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

export const SecretForm: React.FC<SecretFormProps> = ({ getSecrets }): React.ReactNode => {
	const [secret, setSecret] = useState('')
	const [secretLink, setSecretLink] = useState('')
	const [copied, setCopied] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [shareMode, setShareMode] = useState<'private' | 'public'>('public')
	const [charCount, setCharCount] = useState(0)
	const maxChars = 280

	const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const text = e.target.value
		if (text.length <= maxChars) {
			setSecret(text)
			setCharCount(text.length)
		}
	}

	const copyToClipboard = () => {
		navigator.clipboard.writeText(secretLink)
		setCopied(true)
		setTimeout(() => setCopied(false), 2000)
	}

	const resetForm = () => {
		setSecret('')
		setSecretLink('')
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		if (!secret.trim()) return

		try {
			const { response, status } =
				shareMode === 'public'
					? await postRequest<ResponsePublic>(urlPublicSecrets, { secret })
					: await postRequest<ResponsePrivate>(urlPrivateSecrets, { secret, maxAttempts: 3 })
			if (status === 201) {
				toasty.success(response.message)
				getSecrets()
				resetForm()
			}
		} catch (er) {
			if (er instanceof AxiosError && er.response?.data) {
				toasty.error(er.response.data.message)
			} else {
				toasty.error('An unexpected error occurred. Please try again later.')
			}
		}
	}

	return (
		<div className='gap-6 md:col-start-1 md:col-end-5'>
			<div className='lg:col-span-2 bg-white/10 rounded-xl shadow-2xl overflow-hidden h-full '>
				<div className='p-6 md:p-8 h-full'>
					{!secretLink || shareMode === 'public' ? (
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
					) : (
						<div className='flex flex-col gap-6 md:gap-0 md:justify-between h-full'>
							<div className='text-center'>
								<div className='inline-flex items-center justify-center w-16 h-16 bg-green-500/20 rounded-full mb-4'>
									<Lock className='w-8 h-8 text-green-300' />
								</div>
								<h2 className='text-2xl font-bold mb-2'>Secret Link Created!</h2>
								<p className='text-pink-200'>
									Share this link with someone you trust. The secret will self-destruct after being
									viewed once.
								</p>
							</div>

							<div className='bg-white/20 p-4 rounded-lg flex items-center'>
								<input
									type='text'
									value={secretLink}
									readOnly
									className='flex-1 bg-transparent border-none focus:outline-none text-white'
								/>
								<button
									type='button'
									onClick={copyToClipboard}
									className='ml-2 p-2 rounded-md bg-purple-600 hover:bg-purple-700 transition-colors'
								>
									{copied ? 'Copied!' : <Copy size={18} />}
								</button>
							</div>

							<div className='flex space-x-4'>
								<button
									type='button'
									onClick={resetForm}
									className='flex-1 py-3 px-4 rounded-lg border border-pink-400 text-pink-200 hover:bg-pink-400/20 transition-colors flex items-center justify-center'
								>
									<RefreshCw className='w-5 h-5 mr-2' />
									Create Another
								</button>
								<button
									type='button'
									onClick={() => {
										if (navigator.share) {
											navigator.share({
												title: 'Secret Message',
												text: "I've sent you a secret message",
												url: secretLink,
											})
										} else {
											copyToClipboard()
										}
									}}
									className='flex-1 py-3 px-4 rounded-lg bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 transition-colors flex items-center justify-center'
								>
									<Share2 className='w-5 h-5 mr-2' />
									Share
								</button>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}
