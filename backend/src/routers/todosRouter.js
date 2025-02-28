import { Router } from 'express'
import {
  addTodos,
  deleteTodo,
  getTodoListById,
  getTodoLists,
  updateTodoDoneState,
} from '../controllers/todosController.js'

export const todosRouter = Router()

todosRouter.get('/', getTodoLists)
todosRouter.get('/todoList/:todoListId', getTodoListById)
todosRouter.delete('/:todoListId/:todoId', deleteTodo)
todosRouter.put('/:todoListId/:todoId', updateTodoDoneState)
todosRouter.post('/:todoListId', addTodos)
