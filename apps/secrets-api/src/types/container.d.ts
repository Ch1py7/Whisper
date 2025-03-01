import type { DbHandler } from '@/infrastructure/persistance/mongo/db-handler'
import type muid from 'uuid-mongodb'

declare global {
	interface Dependencies {
		dbHandler: typeof DbHandler
		muid: typeof muid
	}
}
