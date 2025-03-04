import { LoadingScreen } from '@/components/LoadingScreen'
import { toasty } from '@/libs/toast'
import { getRequest } from '@/services/requests'
import { AxiosError } from 'axios'
import { AlertTriangle, ArrowLeft, Key, Lock, Send, Shield } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

const urlPrivateSecrets = `${import.meta.env.VITE_BACKEND_URL}/private`

export const SecretViewer: React.FC = (): React.ReactNode => {
	const { secretId } = useParams<{ secretId: string }>()
	const [secretCode, setSecretCode] = useState<string>('')
	const [secret, setSecret] = useState<string | null>(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)
	const [decryptKey, setDecryptKey] = useState('')
	const [isDecrypting, setIsDecrypting] = useState(false)
	const [needsKey, setNeedsKey] = useState(false)
	const navigate = useNavigate()

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		navigate(secretCode)
	}

	const verifySecret = useCallback(async () => {
		try {
			setLoading(true)
			await getRequest(`${urlPrivateSecrets}/${secretId}`)
			setNeedsKey(true)
		} catch {
			setError('This secret has already been viewed or does not exist')
		} finally {
			setLoading(false)
		}
	}, [secretId])

	const handleDecrypt = useCallback(async () => {
		if (!decryptKey.trim()) return
		setIsDecrypting(true)
		try {
			const { response, status } = await getRequest<{ secret: string }>(
				`${urlPrivateSecrets}/${secretId}/${decryptKey}`
			)
			if (status === 200) {
				setSecret(response.secret)
				setNeedsKey(false)
				setIsDecrypting(false)
			}
		} catch (error: unknown) {
			if (error instanceof AxiosError) {
				toasty.error(error.response?.data.error)
			} else {
				toasty.error('Something went wrong...')
			}
		} finally {
			setIsDecrypting(false)
		}
	}, [decryptKey, secretId])

	useEffect(() => {
		if (secretId) {
			verifySecret()
		}
	}, [secretId, verifySecret])

	return (
		<div className='mx-auto px-4 py-12'>
			<header className='text-center mb-12'>
				<div className='flex justify-center mb-4'>
					<Lock className='w-16 h-16 text-pink-300' />
				</div>
				<h1 className='text-4xl md:text-5xl font-bold mb-2'>Whisper</h1>
				<p className='text-xl text-pink-200'>Someone shared a secret with you</p>
			</header>
			<div className='max-w-2xl mx-auto'>
				<Link
					to='/'
					className='inline-flex items-center text-pink-300 hover:text-pink-100 mb-6 transition-colors'
				>
					<ArrowLeft className='w-4 h-4 mr-2' />
					Back to Whisper
				</Link>
				{!secretId ? (
					<form className='flex items-center gap-2'>
						<input
							type='text'
							value={secretCode}
							onChange={(e) => setSecretCode(e.target.value)}
							placeholder='Enter the secret code'
							className='w-full px-4 py-3 bg-white/20 border border-purple-300/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 text-white placeholder-pink-200/70'
						/>
						<button
							type='submit'
							className='p-4 rounded-md bg-purple-600 hover:bg-purple-700 transition-colors'
							onClick={handleSubmit}
						>
							<Send className='w-4 h-4' />
						</button>
					</form>
				) : (
					<div className='bg-white/10 backdrop-blur-lg rounded-xl shadow-2xl overflow-hidden'>
						{loading ? (
							<LoadingScreen
								title='Retrieving Secret...'
								message='Please wait while we securely locate the message'
							/>
						) : error ? (
							<div className='p-12 text-center'>
								<div className='inline-flex items-center justify-center w-16 h-16 bg-red-500/20 rounded-full mb-4'>
									<AlertTriangle className='w-8 h-8 text-red-300' />
								</div>
								<h2 className='text-2xl font-bold mb-2'>Secret Not Found</h2>
								<p className='text-pink-200'>{error}</p>
								<Link
									to='/'
									className='mt-6 inline-flex items-center justify-center px-6 py-3 rounded-lg bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 transition-colors'
								>
									Create Your Own Secret
								</Link>
							</div>
						) : needsKey ? (
							<div className='p-8 md:p-12'>
								<div className='text-center mb-8'>
									<div className='inline-flex items-center justify-center w-16 h-16 bg-purple-500/20 rounded-full mb-4'>
										<Key className='w-8 h-8 text-purple-300' />
									</div>
									<h2 className='text-2xl font-bold mb-2'>Enter Decrypt Key</h2>
									<p className='text-pink-200'>
										You need the decrypt key to access this secret message.
									</p>
								</div>
								<div className='space-y-4'>
									<label className='block text-sm font-medium space-2 text-pink-200'>
										Decrypt Key
										<input
											type='text'
											value={decryptKey}
											onChange={(e) => setDecryptKey(e.target.value)}
											placeholder='Enter the key provided by the sender...'
											className='w-full px-4 py-3 bg-white/20 mt-2 border border-purple-300/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 text-white placeholder-pink-200/70'
										/>
									</label>
									<button
										type='button'
										onClick={handleDecrypt}
										disabled={isDecrypting || !decryptKey.trim()}
										className={`w-full flex items-center justify-center py-3 px-6 rounded-lg text-lg font-medium transition-all duration-300 ${
											isDecrypting || !decryptKey.trim()
												? 'bg-purple-700/50 cursor-not-allowed'
												: 'bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 shadow-lg hover:shadow-xl'
										}`}
									>
										{isDecrypting ? (
											<span className='animate-pulse'>Decrypting...</span>
										) : (
											<>
												<Key className='w-5 h-5 mr-2' />
												Decrypt Message
											</>
										)}
									</button>
								</div>
							</div>
						) : (
							<div className='p-8 md:p-12'>
								<div className='text-center mb-8'>
									<div className='inline-flex items-center justify-center w-16 h-16 bg-green-500/20 rounded-full mb-4'>
										<Shield className='w-8 h-8 text-green-300' />
									</div>
									<h2 className='text-2xl font-bold mb-2'>Secret Message</h2>
									<p className='text-pink-200'>
										You can only see this message once, once you leave this page you will not be
										able to see it again.
									</p>
								</div>
								<div className='bg-black/30 p-6 rounded-lg mb-6'>
									<div>
										<p className='text-lg'>{secret}</p>
									</div>
								</div>
							</div>
						)}
					</div>
				)}
			</div>
		</div>
	)
}
