import { InjectionMode, asValue, createContainer } from 'awilix'
import muid from 'uuid-mongodb'
import { DbHandler } from './infrastructure/persistance/mongo/db-handler'

const container = createContainer<Dependencies>({
	injectionMode: InjectionMode.PROXY,
})

container.register({
	dbHandler: asValue(DbHandler),
	muid: asValue(muid),
})

export default container
