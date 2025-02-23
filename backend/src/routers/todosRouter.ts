import { Router } from 'express'
import { addTodosToTodoListByTodoListId, getTodos } from '../controllers/todosController.ts'

export const todosRouter = Router()

todosRouter.get('/', getTodos)
todosRouter.put('/:id', addTodosToTodoListByTodoListId)
