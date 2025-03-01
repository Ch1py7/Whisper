import { config } from 'infrastructure/config'
import { type Db, MongoClient as mongo, MongoError } from 'mongodb'

const { dbName, mongoConnectionUri, mongoTimeout } = config.run.mongo

let db: Db | null
let client: mongo | null
let instance: Db | null

const _connect = async () => {
	try {
		client = await mongo.connect(mongoConnectionUri!, {
			connectTimeoutMS: mongoTimeout,
		})

		db = client.db(dbName)
		return db
	} catch (error) {
		console.error(`Error connecting to the database: ${error}`)
		if (error instanceof MongoError) {
			throw error
		}
		throw error
	}
}

export const DbHandler = () => {
	const createInstance = async () => {
		const db = await _connect()

		return db
	}

	return {
		getInstance: async () => {
			if (!instance) {
				instance = await createInstance()
			}
			return instance
		},
		disconnect: () => {
			if (client) {
				client.close()
			}
			db = null
			instance = null
			client = null
		},
	}
}
