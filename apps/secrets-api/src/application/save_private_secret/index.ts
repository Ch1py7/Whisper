import { PrivateSecret } from '@/domain/private_secret/private-secret'
import type { SavePrivateSecretCommand } from './command'
import { SavePrivateSecretResponse } from './response'

export class SavePrivateSecret {
	privateSecretRepository: Dependencies['privateSecretRepository']
	crypto: Dependencies['crypto']
	cipher: Dependencies['cipher']

	constructor({
		privateSecretRepository,
		crypto,
		cipher,
	}: Pick<Dependencies, 'privateSecretRepository' | 'crypto' | 'cipher'>) {
		this.privateSecretRepository = privateSecretRepository
		this.crypto = crypto
		this.cipher = cipher
	}

	async execute({ secret }: SavePrivateSecretCommand) {
		const id = this.crypto.randomUUID()
		const { content, iv } = this.cipher.encrypt(secret)
		const secretId = this.cipher.randomString(16)
		const createdAt = new Date()
		const expiresAt = new Date(new Date(createdAt).setDate(createdAt.getDate() + 1))

		const secretDomain = new PrivateSecret({
			id,
			secretId: secretId,
			encryptedSecret: content,
			iv,
			createdAt,
			expiresAt,
		})

		await this.privateSecretRepository.save(secretDomain)

		return new SavePrivateSecretResponse({ iv, secretId })
	}
}
