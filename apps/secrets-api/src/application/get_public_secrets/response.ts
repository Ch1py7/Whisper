export class GetPublicSecretsResponse {
	public secrets: {
		id: string
		createdAt: Date
		secret: string
	}[]

	constructor(secrets: PublicSecretDomain[]) {
		this.secrets = secrets.map(({ id, createdAt, secret }) => ({ id, createdAt, secret }))
	}
}
