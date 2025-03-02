import { InjectionMode, asClass, asFunction, asValue, createContainer } from 'awilix'
import crypto from 'node:crypto'
import muid from 'uuid-mongodb'
import { GetPublicSecrets } from './application/get_public_secrets'
import { SavePublicSecret } from './application/save_public_secret'
import { config } from './infrastructure/config'
import { DbHandler } from './infrastructure/persistance/mongo/db-handler'
import { PublicSecretRepository } from './infrastructure/persistance/mongo/mongo-public-secret-repository'
import { PublicSecretParser } from './infrastructure/persistance/mongo/public-secret-parser'
import { Cipher } from './domain/services/cipher'
import { PrivateSecretParser } from './infrastructure/persistance/mongo/private-secret-parser'
import { PrivateSecretRepository } from './infrastructure/persistance/mongo/mongo-private-secret-repository'

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
})

export default container
