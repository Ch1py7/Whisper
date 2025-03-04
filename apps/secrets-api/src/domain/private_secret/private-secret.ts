import { ID } from '../value_objects/id/id'

export class PrivateSecret {
	private _id: ID
	private _createdAt: Date
	private _expiresAt: Date
	private _secretId: string
	private _encryptedSecret: string
	private _iv: string

	constructor({
		id,
		createdAt,
		expiresAt,
		secretId,
		encryptedSecret,
		iv,
	}: PrivateSecretDomain) {
		this._id = new ID(id)
		this._createdAt = createdAt
		this._expiresAt = expiresAt
		this._secretId = secretId
		this._encryptedSecret = encryptedSecret
		this._iv = iv
	}

	get id() {
		return this._id.value
	}

	get createdAt() {
		return this._createdAt
	}

	get expiresAt() {
		return this._expiresAt
	}

	get secretId() {
		return this._secretId
	}

	get encryptedSecret() {
		return this._encryptedSecret
	}

	get iv() {
		return this._iv
	}
}
