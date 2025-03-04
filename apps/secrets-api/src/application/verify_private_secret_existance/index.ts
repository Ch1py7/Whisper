import type { VerifyPrivateSecretExistanceCommand } from './command'
import { VerifyPrivateSecretExistanceResponse } from './response'

export class VerifyPrivateSecretExistance {
	privateSecretRepository: Dependencies['privateSecretRepository']

	constructor({
		privateSecretRepository,
	}: Pick<Dependencies, 'privateSecretRepository' | 'crypto'>) {
		this.privateSecretRepository = privateSecretRepository
	}

	async execute({ secretId }: VerifyPrivateSecretExistanceCommand) {
		const exists = await this.privateSecretRepository.findById(secretId)

		return new VerifyPrivateSecretExistanceResponse(Boolean(exists))
	}
}
