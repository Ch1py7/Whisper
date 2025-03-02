export class Cipher {
	private readonly _ENCRYPT_ALGORITHM = 'aes-256-ctr'
	private readonly _BASE36_ENCODING = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
	private readonly _crypto: Dependencies['crypto']
	private readonly _privateKey: string

	constructor({ config, crypto }: Pick<Dependencies, 'config' | 'crypto'>) {
		this._crypto = crypto
		this._privateKey = this._normalizePrivateKey(config.general.privateKey)
	}

	private _normalizePrivateKey(privateKey: string) {
		return this._crypto.createHash('sha256').update(privateKey).digest('base64')
	}

	public encrypt(value: string) {
		try {
			const key = Buffer.from(this._privateKey, 'base64')
			const iv = this._crypto.randomBytes(16)
			const cipher = this._crypto.createCipheriv(this._ENCRYPT_ALGORITHM, key, iv)
			const encrypted = Buffer.concat([cipher.update(value), cipher.final()])
			return {
				content: encrypted.toString('hex'),
				iv: iv.toString('hex'),
			}
		} catch (error) {
			console.error(error)
			throw error
		}
	}
	
	public decrypt(encryption: { iv: string; content: string }) {
		try {
			const key = Buffer.from(this._privateKey, 'base64')
			const iv = Buffer.from(encryption.iv, 'hex')
			const decipher = this._crypto.createDecipheriv('aes-256-ctr', key, iv)
			const decrypted = Buffer.concat([
				decipher.update(encryption.content, 'hex'),
				decipher.final(),
			])
			return decrypted.toString()
		} catch (error) {
			throw new Error('Error desencriptando el contenido')
		}
	}

	public randomString(length: number): string {
		return Array.from(this._crypto.randomBytes(length))
			.map((byte) => this._BASE36_ENCODING[byte % this._BASE36_ENCODING.length])
			.join('')
	}
}
