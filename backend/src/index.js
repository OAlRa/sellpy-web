// Npm packages
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'

// Routers
import { todosRouter } from './routers/todosRouter.js'

// Middleware
import { errorHandler } from './middleware/errorHandler.js'
import customLogger from './middleware/logger.js'
import { notFound } from './middleware/notFound.js'

const PORT = 3001

const app = express()

app.use(helmet())
app.use(cors())
app.use(customLogger)
app.use(express.json())
app.use('/todos', todosRouter)
app.use(notFound)
app.use(errorHandler)

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))
