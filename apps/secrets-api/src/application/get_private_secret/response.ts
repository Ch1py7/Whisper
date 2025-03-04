export class GetPrivateSecretResponse {
	public decryptedSecret: string

	constructor(decryptedSecret: string) {
		this.decryptedSecret = decryptedSecret
	}
}
