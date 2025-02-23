import { todoLists } from '../db/db.ts'
import { BadRequestError, NotFoundError } from '../errors/customErrors.ts'
import type { ITodoListDTO } from '../types/DTOs.ts'
import type { Request, Response, NextFunction } from 'express'

export const getTodos = (req: Request, res: Response<ITodoListDTO[]>, next: NextFunction) => {
  try {
    const todos = todoLists
    console.log(todos, 'todos')
    res.status(200).json(todos)
  } catch (error) {
    next(error)
  }
}

export const addTodosToTodoListByTodoListId = (
  req: Request<{ id: string }, {}, { todos: string[] }>,
  res: Response<ITodoListDTO>,
  next: NextFunction
) => {
  try {
    // TODO
    // Validate input
    const { id } = req.params || {}
    const { todos } = req.body || {}
    if (!id) throw new BadRequestError('id')
    if (!todos) throw new BadRequestError(`Body object: with structure ${todos} todo`)

    const findTodoList = todoLists.find((todoList) => todoList.id === id)
    if (!findTodoList) throw new NotFoundError(`Todo list with id ${id}`)

    // Should push just the new ones

    // TODO
    // todos.forEach((todo) => {
    //   findTodoList.todos.push(todo)
    // })

    // Can update the whole list as a first iteration
    findTodoList.todos = todos

    res.status(201).json(findTodoList)
  } catch (error) {
    next(error)
  }
}
