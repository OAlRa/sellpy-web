import { todoLists } from '../db/db.ts'
import { BadRequestError, NotFoundError } from '../errors/customErrors.ts'
import type { ITodoDTO, ITodoListDTO } from '../types/DTOs.ts'
import type { Request, Response, NextFunction } from 'express'
import type { IRequestTodo } from '../types/request.ts'
import { validateParams } from '../utils/utils.ts'
import {
  findTodoList,
  handleNewTodo,
  handleUpdateTodo,
  isExistingTodo,
} from '../services/todosService.ts'

export const getTodoLists = (req: Request, res: Response<ITodoListDTO[]>, next: NextFunction) => {
  try {
    res.status(200).json(todoLists)
  } catch (error) {
    next(error)
  }
}

export const updateTodoDoneState = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { todoListId, todoId } = req.params || {}
    validateParams([todoListId, todoId])
    const todoList = findTodoList(todoListId)
    const findTodo = todoList.todos.find((todo) => todo.id === todoId)
    if (!findTodo) throw new NotFoundError('todo')
    findTodo.done = !findTodo.done
    res.status(200).json({
      message: 'Todo updated',
    })
  } catch (error) {
    next(error)
  }
}

export const getTodoListById = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { todoListId } = req.params || {}
    validateParams([todoListId])
    const todoList = findTodoList(todoListId)
    todoList.allDone = todoList.todos.every((todo) => !!todo.done)
    res.status(200).json(todoList)
  } catch (error) {
    next(error)
  }
}

export const deleteTodo = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { todoListId, todoId } = req.params || {}
    validateParams([todoListId, todoId])
    const todoList = findTodoList(todoListId)
    todoList.todos = [...todoList.todos.filter((todo) => todo.id !== todoId)]
    res.status(200).json({
      message: 'Todo was successfully deleted',
    })
  } catch (error) {
    next(error)
  }
}

export const addTodos = (
  req: Request<{ todoListId: string }, {}, { todos: IRequestTodo[] }>,
  res: Response<ITodoListDTO>,
  next: NextFunction
) => {
  try {
    const { todoListId } = req.params || {}
    validateParams([todoListId])
    const { todos } = req.body || {}
    if (!todos) throw new BadRequestError(`Body object: with structure ${todos} todo`)

    const todoList = findTodoList(todoListId)

    const updatedTodos: ITodoDTO[] = todos.map((todo) => {
      if (isExistingTodo(todo, todoList)) {
        return handleUpdateTodo(todo, todoList)
      }
      return handleNewTodo(todo, todoList)
    })

    todoList.todos = [...updatedTodos]
    if (todoList.todos.every((t) => !!t.done)) {
      todoList.allDone = true
    } else {
      todoList.allDone = false
    }

    res.status(201).json(todoList)
  } catch (error) {
    next(error)
  }
}
