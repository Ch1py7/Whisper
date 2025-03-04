const mongoConnectionUri = process.env.MONGO_URI
const mongoTimeout = 5000

const run = {
	server: {
		port: process.env.PORT || 3000,
	},
	mongo: {
		mongoConnectionUri,
		mongoTimeout,
		dbName: process.env.MONGO_DB_NAME,
	},
}

const test = {
	server: {
		port: 3000,
	},
	mongo: {
		mongoConnectionUri: null,
		mongoTimeout: 1,
		dbName: 'NOT EXISTS',
	},
}

const general = {
	privateKey: process.env.PRIVATE_KEY ?? '',
}

export const config = {
	general,
	run,
	test,
}
