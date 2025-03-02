import { InjectionMode, asClass, asFunction, asValue, createContainer } from 'awilix'
import crypto from 'node:crypto'
import muid from 'uuid-mongodb'
import { SavePublicSecret } from './application/save_public_secret'
import { DbHandler } from './infrastructure/persistance/mongo/db-handler'
import { PublicSecretRepository } from './infrastructure/persistance/mongo/mongo-public-secret-repository'
import { PublicSecretParser } from './infrastructure/persistance/mongo/public-secret-parser'
import { GetPublicSecrets } from './application/get_public_secrets'

const container = createContainer<Dependencies>({
	injectionMode: InjectionMode.PROXY,
})

container.register({
	dbHandler: asFunction(DbHandler),
	muid: asValue(muid),
	crypto: asValue(crypto),
	publicParser: asClass(PublicSecretParser),
	publicSecretRepository: asClass(PublicSecretRepository),
	savePublicSecret: asClass(SavePublicSecret),
	getPublicSecrets: asClass(GetPublicSecrets),
})

export default container
