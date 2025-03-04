import { InjectionMode, asClass, asFunction, asValue, createContainer } from 'awilix'
import crypto from 'node:crypto'
import muid from 'uuid-mongodb'
import { GetPrivateSecret } from './application/get_private_secret'
import { GetPublicSecrets } from './application/get_public_secrets'
import { SavePrivateSecret } from './application/save_private_secret'
import { SavePublicSecret } from './application/save_public_secret'
import { VerifyPrivateSecretExistance } from './application/verify_private_secret_existance'
import { Cipher } from './domain/services/cipher'
import { config } from './infrastructure/config'
import { DbHandler } from './infrastructure/persistance/mongo/db-handler'
import { PrivateSecretRepository } from './infrastructure/persistance/mongo/mongo-private-secret-repository'
import { PublicSecretRepository } from './infrastructure/persistance/mongo/mongo-public-secret-repository'
import { PrivateSecretParser } from './infrastructure/persistance/mongo/private-secret-parser'
import { PublicSecretParser } from './infrastructure/persistance/mongo/public-secret-parser'

const container = createContainer<Dependencies>({
	injectionMode: InjectionMode.PROXY,
})

container.register({
	dbHandler: asFunction(DbHandler),
	muid: asValue(muid),
	crypto: asValue(crypto),
	config: asValue(config),
	publicParser: asClass(PublicSecretParser),
	privateParser: asClass(PrivateSecretParser),
	publicSecretRepository: asClass(PublicSecretRepository),
	privateSecretRepository: asClass(PrivateSecretRepository),
	savePublicSecret: asClass(SavePublicSecret),
	getPublicSecrets: asClass(GetPublicSecrets),
	cipher: asClass(Cipher),
	savePrivateSecret: asClass(SavePrivateSecret),
	verifyPrivateSecretExistance: asClass(VerifyPrivateSecretExistance),
	getPrivateSecret: asClass(GetPrivateSecret),
})

export default container
