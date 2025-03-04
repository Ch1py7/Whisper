export class GetPrivateSecretCommand {
	public secretId: string
	public decryptKey: string

	constructor(secretId: string, decryptKey: string) {
		this.secretId = secretId
		this.decryptKey = decryptKey
	}
}
