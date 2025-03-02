import type { GetPublicSecretsCommand } from './command'
import { GetPublicSecretsResponse } from './response'

export class GetPublicSecrets {
	publicSecretRepository: Dependencies['publicSecretRepository']
	crypto: Dependencies['crypto']

	constructor({
		publicSecretRepository,
		crypto,
	}: Pick<Dependencies, 'publicSecretRepository' | 'crypto'>) {
		this.publicSecretRepository = publicSecretRepository
		this.crypto = crypto
	}

	async execute({ limit, lastDate }: GetPublicSecretsCommand) {
		const parsedDate = lastDate ? new Date(lastDate) : undefined
		const secrets = await this.publicSecretRepository.get(limit, parsedDate)

		return new GetPublicSecretsResponse(secrets)
	}
}
