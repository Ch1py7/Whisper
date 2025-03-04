export class VerifyPrivateSecretExistanceCommand {
	public secretId: string

	constructor(secretId: string) {
		this.secretId = secretId
	}
}
