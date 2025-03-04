import type { GetPrivateSecretCommand } from './command'
import { GetPrivateSecretResponse } from './response'

export class GetPrivateSecret {
	privateSecretRepository: Dependencies['privateSecretRepository']
	cipher: Dependencies['cipher']

	constructor({
		privateSecretRepository,
		cipher,
	}: Pick<Dependencies, 'privateSecretRepository' | 'cipher'>) {
		this.privateSecretRepository = privateSecretRepository
		this.cipher = cipher
	}

	async execute({ decryptKey, secretId }: GetPrivateSecretCommand) {
		const secret = await this.privateSecretRepository.findById(secretId)
		if (secret) {
			const decryptedSecret = this.cipher.decrypt({
				iv: decryptKey,
				content: secret.encryptedSecret,
			})
			return new GetPrivateSecretResponse(decryptedSecret)
		}
	}
}
