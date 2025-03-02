import { PublicSecret } from '@/domain/public_secret/public-secret'
import type { SavePublicSecretCommand } from './command'

export class SavePublicSecret {
	publicSecretRepository: Dependencies['publicSecretRepository']
	crypto: Dependencies['crypto']

	constructor({
		publicSecretRepository,
		crypto,
	}: Pick<Dependencies, 'publicSecretRepository' | 'crypto'>) {
		this.publicSecretRepository = publicSecretRepository
		this.crypto = crypto
	} 

	async execute({ secret }: SavePublicSecretCommand) {
		const id = this.crypto.randomUUID()

		const secretDomain = new PublicSecret({
			id,
			createdAt: new Date(),
			secret,
		})

		await this.publicSecretRepository.save(secretDomain)
	}
}
