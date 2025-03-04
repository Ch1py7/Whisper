import type { DeletePrivateSecret } from '@/application/delete_private_secret'
import type { GetPrivateSecret } from '@/application/get_private_secret'
import type { GetPublicSecrets } from '@/application/get_public_secrets'
import type { SavePrivateSecret } from '@/application/save_private_secret'
import type { SavePublicSecret } from '@/application/save_public_secret'
import type { VerifyPrivateSecretExistance } from '@/application/verify_private_secret_existance'
import type { Cipher } from '@/domain/services/cipher'
import type { config } from '@/infrastructure/config'
import type { DbHandler } from '@/infrastructure/persistance/mongo/db-handler'
import type { PrivateSecretRepository } from '@/infrastructure/persistance/mongo/mongo-private-secret-repository'
import type { PublicSecretRepository } from '@/infrastructure/persistance/mongo/mongo-public-secret-repository'
import type { PrivateSecretParser } from '@/infrastructure/persistance/mongo/private-secret-parser'
import type { PublicSecretParser } from '@/infrastructure/persistance/mongo/public-secret-parser'
import type crypto from 'node:crypto'
import type muid from 'uuid-mongodb'

declare global {
	interface Dependencies {
		dbHandler: ReturnType<typeof DbHandler>
		muid: typeof muid
		crypto: typeof crypto
		config: typeof config
		publicParser: PublicSecretParser
		privateParser: PrivateSecretParser
		publicSecretRepository: PublicSecretRepository
		privateSecretRepository: PrivateSecretRepository
		savePublicSecret: SavePublicSecret
		getPublicSecrets: GetPublicSecrets
		cipher: Cipher
		savePrivateSecret: SavePrivateSecret
		verifyPrivateSecretExistance: VerifyPrivateSecretExistance
		getPrivateSecret: GetPrivateSecret
		deletePrivateSecret: DeletePrivateSecret
	}
}
