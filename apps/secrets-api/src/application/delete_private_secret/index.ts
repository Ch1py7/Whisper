import type { DeletePrivateSecretCommand } from './command'

export class DeletePrivateSecret {
	privateSecretRepository: Dependencies['privateSecretRepository']

	constructor({ privateSecretRepository }: Pick<Dependencies, 'privateSecretRepository'>) {
		this.privateSecretRepository = privateSecretRepository
	}

	async execute({ secretId }: DeletePrivateSecretCommand) {
		await this.privateSecretRepository.deleteById(secretId)
	}
}
