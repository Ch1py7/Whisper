export class InvalidSecretError extends Error {
	constructor(message: string) {
		super(message)
		this.name = 'InvalidSecretError'
	}
}
