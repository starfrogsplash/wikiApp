import express from 'express'
import { json } from 'body-parser'
import {documentRouter} from './routes/documentRouter'
import expressPino from "express-pino-logger";

const app = express()

app.use(expressPino())
app.use(json())
app.use(documentRouter)

export { app }


