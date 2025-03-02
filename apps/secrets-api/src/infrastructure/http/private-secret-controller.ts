import { SavePrivateSecretCommand } from '@/application/save_private_secret/command'
import container from '@/container'
import express from 'express'

const router = express.Router()

router.post('/', async (req: express.Request, res: express.Response) => {
	const { secret, maxAttempts }: SavePrivateSecretCommand = req.body

	if (!secret || !maxAttempts) {
		res.status(400).json({ error: 'Missing required fields: secret or max attempts' })
		return
	}

	try {
		const command = new SavePrivateSecretCommand({ secret, maxAttempts })
		const savePrivateSecret = container.resolve('savePrivateSecret')
		const data = await savePrivateSecret.execute(command)

		res.status(201).json({
			message: 'Secret created successfully',
			data,
		})
	} catch (error) {
		res.status(500).json({
			message: 'An error occurred while creating the secret',
			error: (error as Error).message || 'Unknown error',
		})
	}
})

export { router }
