import { todoLists } from '../db/db.ts'
import { BadRequestError, NotFoundError } from '../errors/customErrors.ts'
import type { ITodoDTO, ITodoListDTO } from '../types/DTOs.ts'
import type { Request, Response, NextFunction } from 'express'
import type { IRequestTodo } from '../types/request.ts'
import { v4 as uuidv4 } from 'uuid'

export const getTodoLists = (req: Request, res: Response<ITodoListDTO[]>, next: NextFunction) => {
  try {
    res.status(200).json(todoLists)
  } catch (error) {
    next(error)
  }
}

export const addTodosToTodoListByTodoListId = (
  req: Request<{ todoListId: string }, {}, { todos: IRequestTodo[] }>,
  res: Response<ITodoListDTO>,
  next: NextFunction
) => {
  try {
    const { todoListId } = req.params || {}
    const { todos } = req.body || {}
    if (!todoListId) throw new BadRequestError('todoListId')
    if (!todos) throw new BadRequestError(`Body object: with structure ${todos} todo`)

    const findTodoList = todoLists.find((todoList) => todoList.id === todoListId)
    if (!findTodoList) throw new NotFoundError(`Todo list with id ${todoListId}`)

    const isExistingTodo = (todo: IRequestTodo) => {
      if (!todo.id) return false
      if (!findTodoList.todos.find((dbTodo) => dbTodo.id === todo.id)) return false
      return true
    }

    const handleUpdateTodo = (todo: IRequestTodo): ITodoDTO => {
      const todoToUpdate = findTodoList.todos.find((dbTodo) => dbTodo.id === todo.id)
      return {
        ...todoToUpdate,
        done: todo.done,
        listId: todo.listId,
        title: todo.title,
      }
    }

    const handleNewTodo = (todo: IRequestTodo): ITodoDTO => {
      return {
        id: uuidv4(),
        title: todo.title,
        done: todo.done,
        listId: findTodoList.id,
        createdAt: new Date(),
      }
    }

    const updatedTodos: ITodoDTO[] = todos.map((todo) => {
      if (isExistingTodo(todo)) {
        return handleUpdateTodo(todo)
      }
      return handleNewTodo(todo)
    })

    findTodoList.todos = [...updatedTodos]
    if (findTodoList.todos.every((t) => !!t.done)) {
      findTodoList.allDone = true
    } else {
      findTodoList.allDone = false
    }

    res.status(201).json(findTodoList)
  } catch (error) {
    next(error)
  }
}
