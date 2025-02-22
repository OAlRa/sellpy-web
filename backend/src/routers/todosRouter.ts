import { Router } from 'express'
import { getTodos } from '../controllers/todosController.ts'

export const todosRouter = Router()

todosRouter.get('/', getTodos)
