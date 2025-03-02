import 'module-alias/register'
import dotenv from 'dotenv'
dotenv.config()
import cors from 'cors'
import express from 'express'
import { router as publicSecretRoutes } from './infrastructure/http/public-secret-controller'
import { router as privateSecretRoutes } from './infrastructure/http/private-secret-controller'

const app = express()
const port = process.env.PORT || 8000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/v1/public', publicSecretRoutes)
app.use('/api/v1/private', privateSecretRoutes)

app.listen(port, () => {
	console.log(`Server running on port ${port}`)
})

export default app
