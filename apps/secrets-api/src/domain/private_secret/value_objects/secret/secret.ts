import { InvalidSecretError } from './errors'

export class Secret {
	public readonly value: string
	constructor(secret: string) {
		this._assertSecret(secret)
		this.value = secret
	}

	private _assertSecret(secret: string) {
		if (secret.length > 500) {
			throw new InvalidSecretError('The secret must be less than 500 characters')
		}
	}
}
