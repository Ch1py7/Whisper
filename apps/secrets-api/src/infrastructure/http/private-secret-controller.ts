import { GetPrivateSecretCommand } from '@/application/get_private_secret/command'
import { SavePrivateSecretCommand } from '@/application/save_private_secret/command'
import { VerifyPrivateSecretExistanceCommand } from '@/application/verify_private_secret_existance/command'
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

router.get('/:secretId/:decryptKey?', async (req: express.Request, res: express.Response) => {
	const { secretId, decryptKey } = req.params

	if (!secretId) {
		res.status(400).json({ error: 'Missing required field: secretId' })
		return
	}

	try {
		if (decryptKey) {
			const command = new GetPrivateSecretCommand(secretId, decryptKey)
			const getPrivateSecret = container.resolve('getPrivateSecret')
			const secret = await getPrivateSecret.execute(command)
			secret ? res.status(200).json({ data: secret }) : res.sendStatus(404)
		} else {
			const command = new VerifyPrivateSecretExistanceCommand(secretId)
			const verifyPrivateSecretExistance = container.resolve('verifyPrivateSecretExistance')
			const exists = await verifyPrivateSecretExistance.execute(command)
			res.sendStatus(exists ? 200 : 404)
		}
	} catch (error) {
		res.status(500).json({
			message: 'An error occurred while fetching the secret',
			error: (error as Error).message || 'Unknown error',
		})
	}
})

export { router }
