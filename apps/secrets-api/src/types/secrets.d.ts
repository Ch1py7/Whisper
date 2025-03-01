import type { MUUID } from 'uuid-mongodb'

declare global {
	interface PublicSecretDocument {
		_id: MUUID
		created_at: string
		secret: string
	}

	interface PublicSecretDomain {
		id: string
		createdAt: string
		secret: string
	}
}
