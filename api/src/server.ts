import express from 'express'
import path from 'path'
import cors from 'cors'
import { urlencoded } from 'body-parser'

export const app = express()

app.use(cors())
app.use(urlencoded({ extended: false}))

export default app