import type { DbHandler } from '@/infrastructure/persistance/mongo/db-handler'
import type { PublicSecretParser } from '@/infrastructure/persistance/mongo/public-secret-parser'
import type muid from 'uuid-mongodb'

declare global {
	interface Dependencies {
		dbHandler: typeof DbHandler
		muid: typeof muid
		publicParser: PublicSecretParser
	}
}
