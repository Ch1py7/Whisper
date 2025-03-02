import { ID } from '../value_objects/id/id'
import { Secret } from './value_objects/secret/secret'

export class PublicSecret {
	private _id: ID
	private _createdAt: Date
	private _secret: Secret

	constructor({ id, createdAt, secret }: PublicSecretDomain) {
		this._id = new ID(id)
		this._createdAt = createdAt
		this._secret = new Secret(secret)
	}

	get id() {
		return this._id.value
	}

	get createdAt() {
		return this._createdAt
	}

	get secret() {
		return this._secret.value
	}
}
