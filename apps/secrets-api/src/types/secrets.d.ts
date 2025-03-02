import type { MUUID } from 'uuid-mongodb'

declare global {
	interface PublicSecretDocument {
		_id: MUUID
		created_at: Date
		secret: string
	}

	interface PublicSecretDomain {
		id: string
		createdAt: Date
		secret: string
	}
}
