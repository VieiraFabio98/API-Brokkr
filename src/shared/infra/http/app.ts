import 'reflect-metadata'
import 'dotenv/config'
import cors from 'cors'
import express, { NextFunction, Request, Response } from 'express'
import 'express-async-errors'
import { router } from './routes'
import '@shared/container'

const app = express()

// @ts-ignore
app.use(express.json( { limit: '250mb' } ))

const options: cors.CorsOptions = {
  origin: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
}

app.use(cors(options))

app.use(router)

export { app }

