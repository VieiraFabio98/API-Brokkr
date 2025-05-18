import 'reflect-metadata'
import 'dotenv/config'
import cors from 'cors'
import express from 'express'
import 'express-async-errors'
import { router } from './routes'
import '@shared/container'
import swaggerUi from 'swagger-ui-express'
import { swaggerDocument } from './swagger'

const app = express()

// @ts-ignore
app.use(express.json( { limit: '250mb' } ))

const options: cors.CorsOptions = {
  origin: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
}

app.use(cors(options))

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.use(router)

export { app }

