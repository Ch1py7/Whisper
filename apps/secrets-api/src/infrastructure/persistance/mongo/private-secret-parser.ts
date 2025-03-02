import { PrivateSecret } from '@/domain/private_secret/private-secret'

export class PrivateSecretParser {
	private _uuid: Dependencies['muid']

	constructor({ muid }: Pick<Dependencies, 'muid'>) {
		this._uuid = muid
	}

	toDomain({
		_id,
		created_at,
		expires_at,
		secret_id,
		encrypted_secret,
		iv,
		attempts,
		max_attempts,
	}: PrivateSecretDocument) {
		const id = _id.toString()
		return new PrivateSecret({
			id,
			createdAt: created_at,
			expiresAt: expires_at,
			secretId: secret_id,
			encryptedSecret: encrypted_secret,
			iv,
			attempts,
			maxAttempts: max_attempts,
		})
	}

	toDocument({
		id,
		createdAt,
		expiresAt,
		secretId,
		encryptedSecret,
		iv,
		attempts,
		maxAttempts,
	}: PrivateSecretDomain) {
		const _id = this._uuid.from(id)
		return {
			_id,
			created_at: createdAt,
			expires_at: expiresAt,
			secret_id: secretId,
			encrypted_secret: encryptedSecret,
			iv,
			attempts,
			max_attempts: maxAttempts,
		}
	}
}
