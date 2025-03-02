export class SavePrivateSecretResponse {
	public iv: string
	public secretId: string

	constructor({ iv, secretId }: IResponse) {
		this.iv = iv
		this.secretId = secretId
	}
}

interface IResponse {
	iv: string
	secretId: string
}
