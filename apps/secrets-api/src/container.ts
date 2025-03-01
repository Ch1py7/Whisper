import { InjectionMode, asClass, asValue, createContainer } from 'awilix'
import muid from 'uuid-mongodb'
import { DbHandler } from './infrastructure/persistance/mongo/db-handler'
import { PublicSecretParser } from './infrastructure/persistance/mongo/public-secret-parser'

const container = createContainer<Dependencies>({
	injectionMode: InjectionMode.PROXY,
})

container.register({
	dbHandler: asValue(DbHandler),
	muid: asValue(muid),
	publicParser: asClass(PublicSecretParser),
})

export default container
