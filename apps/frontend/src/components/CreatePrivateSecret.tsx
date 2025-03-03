import { toasty } from '@/libs/toast'
import { Copy, Eye, EyeOff, Key, Lock, RefreshCw, Share2 } from 'lucide-react'
import { useCallback, useState } from 'react'

interface PrivateSecretProps {
	secretLink: string
	decryptKey: string
	resetForm: () => void
}

export const CreatePrivateSecret: React.FC<PrivateSecretProps> = ({
	secretLink,
	decryptKey,
	resetForm,
}): React.ReactNode => {
	const [showKey, setShowKey] = useState(false)
	const [copied, setCopied] = useState(false)
	const [keyCopied, setKeyCopied] = useState(false)
	const [bothCopied, setBothCopied] = useState(false)

	const copyToClipboard = useCallback(
		(text: string, setCopiedState: React.Dispatch<React.SetStateAction<boolean>>) => {
			navigator.clipboard.writeText(text)
			toasty.success('Secret copied to clipboard')
			setCopiedState(true)
			setTimeout(() => setCopiedState(false), 2000)
		},
		[]
	)

	const text = `I've sent you a secret message.\nYou'll need this key to decrypt it: ${decryptKey}\n\n🔗 ${window.location}secret/${secretLink}`

	return (
		<div className='flex flex-col gap-6 md:justify-between h-full'>
			<div className='text-center'>
				<div className='inline-flex items-center justify-center w-16 h-16 bg-green-500/20 rounded-full mb-4'>
					<Lock className='w-8 h-8 text-green-300' />
				</div>
				<h2 className='text-2xl font-bold mb-2'>Secret Link Created!</h2>
				<p className='text-pink-200'>
					Share this link with someone you trust. The secret will self-destruct after being viewed
					once.
				</p>
			</div>
			<div className='space-y-4'>
				<div>
					<p className='block text-sm font-medium mb-2 text-pink-200'>Secret Link</p>
					<div className='bg-white/20 p-4 rounded-lg flex items-center'>
						<input
							type='text'
							value={secretLink}
							readOnly
							className='flex-1 bg-transparent border-none focus:outline-none text-white'
						/>
						<button
							type='button'
							onClick={() => copyToClipboard(secretLink, setCopied)}
							className='ml-2 p-2 rounded-md bg-purple-600 hover:bg-purple-700 transition-colors'
							title='Copy link'
						>
							{copied ? 'Copied!' : <Copy size={18} />}
						</button>
					</div>
				</div>

				<div>
					<div className='text-sm font-medium mb-2 text-pink-200 flex items-center'>
						<Key className='w-4 h-4 mr-1' />
						Decrypt Key
						<span className='ml-2 text-xs bg-pink-500/30 px-2 py-0.5 rounded-full'>
							Required to view
						</span>
					</div>
					<div className='bg-white/20 p-4 rounded-lg flex items-center relative'>
						<div className={`flex-1 font-mono ${!showKey ? 'blur-sm select-none' : ''}`}>
							{decryptKey}
						</div>
						<div className='flex'>
							<button
								type='button'
								onClick={() => setShowKey(!showKey)}
								className='p-2 rounded-md bg-purple-600/50 hover:bg-purple-700/50 transition-colors mr-2'
								title={showKey ? 'Hide key' : 'Show key'}
							>
								{showKey ? <EyeOff className='w-4 h-4' /> : <Eye className='w-4 h-4' />}
							</button>
							<button
								type='button'
								onClick={() => copyToClipboard(decryptKey, setKeyCopied)}
								className='p-2 rounded-md bg-purple-600 hover:bg-purple-700 transition-colors'
								title='Copy key'
							>
								{keyCopied ? 'Copied!' : <Copy className='w-4 h-4' />}
							</button>
						</div>
					</div>
					<p className='mt-2 text-xs text-pink-200/70'>
						The recipient will need both the link and this key to decrypt your message.
					</p>
				</div>
			</div>
			<div className='flex space-x-4 mt-6'>
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
					onClick={() => copyToClipboard(text, setBothCopied)}
					className='flex-1 py-3 px-4 rounded-lg bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 transition-colors flex items-center justify-center'
				>
					<Share2 className='w-5 h-5 mr-2' />
					{bothCopied ? 'Copied!' : 'Copy Both'}
				</button>
			</div>
		</div>
	)
}
