import { GetPublicSecretsCommand } from '@/application/get_public_secrets/command'
import { SavePublicSecretCommand } from '@/application/save_public_secret/command'
import container from '@/container'
import express from 'express'

const router = express.Router()

router.post('/', async (req: express.Request, res: express.Response) => {
	const { secret }: SavePublicSecretCommand = req.body

	if (!secret) {
		res.status(400).json({ error: 'Missing required field: secret' })
		return
	}

	try {
		const command = new SavePublicSecretCommand(secret)
		const savePublicSecret = container.resolve('savePublicSecret')
		await savePublicSecret.execute(command)

		res.status(201).json({
			message: 'Secret created successfully',
		})
	} catch (error) {
		res.status(500).json({
			message: 'An error occurred while creating the secret',
			error: (error as Error).message || 'Unknown error',
		})
	}
})

router.get('/', async (req: express.Request, res: express.Response) => {
	const { limit, lastDate } = req.query

	if (!limit) {
		res.status(400).json({ error: 'Missing required field: limit' })
		return
	}

	try {
		const command = new GetPublicSecretsCommand(Number(limit), lastDate?.toString())
		const getPublicSecrets = container.resolve('getPublicSecrets')
		const { secrets } = await getPublicSecrets.execute(command)

		res.status(200).json({
			message: 'Secrets fetched successfully',
			data: secrets,
		})
	} catch (error) {
		res.status(500).json({
			message: 'An error occurred while fetch the secrets',
			error: (error as Error).message || 'Unknown error',
		})
	}
})

export { router }
