export class SavePrivateSecretCommand {
	public secret: string
	public maxAttempts: number

	constructor({ secret, maxAttempts }: ICommand) {
		this.secret = secret
		this.maxAttempts = maxAttempts
	}
}

interface ICommand {
	secret: string
	maxAttempts: number
}
