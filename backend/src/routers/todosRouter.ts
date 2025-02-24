import { Router } from 'express'
import { addTodosToTodoListByTodoListId, getTodoLists } from '../controllers/todosController.ts'

export const todosRouter = Router()

todosRouter.get('/', getTodoLists)
todosRouter.put('/:todoListId', addTodosToTodoListByTodoListId)
