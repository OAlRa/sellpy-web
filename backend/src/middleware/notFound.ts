import { NotFoundError } from '../errors/customErrors.ts'
import type { Request, Response, NextFunction } from 'express'

export const notFound = (req: Request, res: Response, next: NextFunction) => {
  next(new NotFoundError(`Route: ${req.url}`))
}
