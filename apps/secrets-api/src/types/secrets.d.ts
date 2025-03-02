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

	interface PrivateSecretDocument {
		_id: MUUID
		secret_id: string
		encrypted_secret: string
		attempts: number
		max_attempts: number
		created_at: Date
		expires_at: Date
	}

	interface PrivateSecretDomain {
		id: string
		secretId: string
		encryptedSecret: string
		attempts: number
		maxAttempts: number
		createdAt: Date
		expiresAt: Date
	}
}
