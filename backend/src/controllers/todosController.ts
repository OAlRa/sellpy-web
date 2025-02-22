import { todoLists } from '../db/db.ts'
import type { ITodoList } from '../db/db.ts'
import type { Request, Response, NextFunction } from 'express'

export const getTodos = (
  req: Request,
  res: Response<Record<string, ITodoList>[]>,
  next: NextFunction
) => {
  try {
    const todos = todoLists
    res.status(200).json(todos)
  } catch (error) {
    next(error)
  }
}
