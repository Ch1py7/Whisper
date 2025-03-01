import muid from 'uuid-mongodb'

export class ID {
	public readonly value: string

	constructor(value: string) {
		muid.from(value)
		this.value = value
	}
}
