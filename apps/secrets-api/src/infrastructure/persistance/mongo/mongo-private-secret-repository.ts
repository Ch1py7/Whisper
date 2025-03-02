import { MongoError } from 'mongodb'

const SECRETS = 'private_secrets'

export class PrivateSecretRepository {
	dbHandler: Dependencies['dbHandler']
	privateParser: Dependencies['privateParser']
	uuid: Dependencies['muid']

	constructor({
		dbHandler,
		privateParser,
		muid,
	}: Pick<Dependencies, 'dbHandler' | 'privateParser' | 'muid'>) {
		this.dbHandler = dbHandler
		this.privateParser = privateParser
		this.uuid = muid
	}

	async save(secretDomain: PrivateSecretDomain) {
		try {
			const db = await this.dbHandler.getInstance()
			const secretDocument = this.privateParser.toDocument(secretDomain)

			await db.collection<PrivateSecretDocument>(SECRETS).insertOne(secretDocument)
		} catch (error: unknown) {
			if (error instanceof MongoError) {
				throw error
			}
			throw error
		}
	}
}
