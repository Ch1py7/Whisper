export class SavePrivateSecretCommand {
	public secret: string

	constructor({ secret }: ICommand) {
		this.secret = secret
	}
}

interface ICommand {
	secret: string
}
