import { InjectionMode, asClass, asValue, createContainer } from 'awilix'
import muid from 'uuid-mongodb'
import { DbHandler } from './infrastructure/persistance/mongo/db-handler'
import { PublicSecretParser } from './infrastructure/persistance/mongo/public-secret-parser'
import { PublicSecretRepository } from './infrastructure/persistance/mongo/mongo-public-secret-repository'

const container = createContainer<Dependencies>({
	injectionMode: InjectionMode.PROXY,
})

container.register({
	dbHandler: asValue(DbHandler),
	muid: asValue(muid),
	publicParser: asClass(PublicSecretParser),
	publicSecretRepository: asClass(PublicSecretRepository)
})

export default container
