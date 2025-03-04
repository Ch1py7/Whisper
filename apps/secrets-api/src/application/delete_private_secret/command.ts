export class DeletePrivateSecretCommand {
	public secretId: string

	constructor(secretId: string) {
		this.secretId = secretId
	}
}
