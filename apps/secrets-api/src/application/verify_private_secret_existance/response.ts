export class VerifyPrivateSecretExistanceResponse {
	public exists: boolean

	constructor(exists: boolean) {
		this.exists = exists
	}
}
