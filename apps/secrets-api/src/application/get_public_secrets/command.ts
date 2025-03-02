export class GetPublicSecretsCommand {
	public limit: number
	public lastDate?: string

	constructor(limit: number, lastDate?: string) {
		this.limit = limit
		this.lastDate = lastDate
	}
}
