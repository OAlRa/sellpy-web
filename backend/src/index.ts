// Npm packages
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'

// Routers
import { todosRouter } from './routers/todosRouter.ts'

// Middleware
import { errorHandler } from './middleware/errorHandler.ts'

const PORT = 3001

const app = express()

app.use(helmet())
app.use(cors())
app.use(express.json())
app.use('/todos', todosRouter)
app.use(errorHandler)

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))
