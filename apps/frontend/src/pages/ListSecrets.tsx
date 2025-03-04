import { SecretCard } from '@/components/SecretCard'
import { toasty } from '@/libs/toast'
import { getRequest } from '@/services/requests'
import { useCallback, useEffect, useRef, useState } from 'react'

interface Response {
	data: PublicSecret[]
	message: string
}

const urlPublicSecrets = `${import.meta.env.VITE_BACKEND_URL}/public`
const LIMIT = 10

export const ListSecrets: React.FC = (): React.ReactNode => {
	const [filter, setFilter] = useState('latest')
	const [publicSecrets, setPublicSecrets] = useState<PublicSecret[]>([])
	const [lastDate, setLastDate] = useState<string | null>(null)
	const [hasMore, setHasMore] = useState(true)
	const observer = useRef<IntersectionObserver | null>(null)

	const [loading, setLoading] = useState<boolean>(false)

	const getSecrets = useCallback(async () => {
		if (!hasMore) return
		setLoading(true)
		try {
			const url = lastDate
				? `${urlPublicSecrets}?limit=${LIMIT}&lastDate=${lastDate}`
				: `${urlPublicSecrets}?limit=${LIMIT}`

			const { response, status } = await getRequest<Response>(url)
			if (status === 200) {
				const secrets = response.data
				setPublicSecrets((prev) => [...prev, ...secrets])

				if (secrets.length < LIMIT) {
					setHasMore(false)
				}
			}
		} catch {
			toasty.error('Something went wrong...')
		} finally {
			setLoading(false)
		}
	}, [lastDate, hasMore])

	useEffect(() => {
		getSecrets()
	}, [getSecrets])

	const lastSecretRef = useCallback(
		(node: HTMLDivElement) => {
			if (loading) return
			if (observer.current) observer.current.disconnect()
			observer.current = new IntersectionObserver(
				(entries) => {
					if (entries[0].isIntersecting && hasMore) {
						setLastDate(publicSecrets[publicSecrets.length - 1].createdAt)
					}
				},
				{ threshold: 1.0 }
			)
			if (node) observer.current.observe(node)
		},
		[loading, hasMore, publicSecrets]
	)

	return (
		<div className='max-w-3xl mx-auto px-4 md:px-0 pt-10'>
			<div className='flex justify-between items-center mb-6 flex-col xxs:flex-row gap-3 xxs:gap-0'>
				<h2 className='text-2xl font-semibold'>Community Secrets</h2>
			</div>

			<div className='space-y-4'>
				{publicSecrets.map((secret, index) => {
					const isLast = index === publicSecrets.length - 1
					return <SecretCard ref={isLast ? lastSecretRef : undefined} key={secret.id} {...secret} />
				})}
			</div>

			{hasMore && <p className='text-center text-gray-400'>Loading more secrets...</p>}
		</div>
	)
}
