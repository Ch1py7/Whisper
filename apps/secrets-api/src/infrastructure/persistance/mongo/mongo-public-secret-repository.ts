import { MongoError } from 'mongodb'

const SECRETS = 'public_secrets'

export class PublicSecretRepository {
	dbHandler: Dependencies['dbHandler']
	publicParser: Dependencies['publicParser']
	uuid: Dependencies['muid']

	constructor({
		dbHandler,
		publicParser,
		muid,
	}: Pick<Dependencies, 'dbHandler' | 'publicParser' | 'muid'>) {
		this.dbHandler = dbHandler
		this.publicParser = publicParser
		this.uuid = muid
	}

	async save(secretDomain: PublicSecretDomain) {
		const db = await this.dbHandler.getInstance()
		try {
			const secretDocument = this.publicParser.toDocument(secretDomain)

			await db.collection<PublicSecretDocument>(SECRETS).insertOne(secretDocument)
		} catch (error: unknown) {
			if (error instanceof MongoError) {
				throw error
			}
			throw error
		}
	}
}
