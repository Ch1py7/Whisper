import { PublicSecret } from '@/domain/public_secret/public-secret'

export class PublicSecretParser {
	private _uuid: Dependencies['muid']

	constructor({ muid }: Pick<Dependencies, 'muid'>) {
		this._uuid = muid
	}

	toDomain({ _id, created_at, secret }: PublicSecretDocument) {
		const id = _id.toString()
		return new PublicSecret({
			id,
			createdAt: created_at,
			secret,
		})
	}

	toDocument({ id, createdAt, secret }: PublicSecretDomain) {
		const _id = this._uuid.from(id)
		return {
			_id,
			created_at: createdAt,
			secret,
		}
	}
}
