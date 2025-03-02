import { ID } from '../value_objects/id/id'

export class PrivateSecret {
	private _id: ID
	private _createdAt: Date
	private _expiresAt: Date
	private _secretId: string
	private _encryptedSecret: string
	private _iv: string
	private _attempts: number
	private _maxAttempts: number

	constructor({
		id,
		createdAt,
		expiresAt,
		secretId,
		encryptedSecret,
		iv,
		attempts,
		maxAttempts,
	}: PrivateSecretDomain) {
		this._id = new ID(id)
		this._createdAt = createdAt
		this._expiresAt = expiresAt
		this._secretId = secretId
		this._encryptedSecret = encryptedSecret
		this._iv = iv
		this._attempts = attempts
		this._maxAttempts = maxAttempts
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

	get attempts() {
		return this._attempts
	}

	get maxAttempts() {
		return this._maxAttempts
	}
}
