import { AppError } from '../errors/customErrors.ts'
import type { NextFunction, Request, Response } from 'express'

export const errorHandler = (err: unknown, req: Request, res: Response, next: NextFunction) => {
  let message = 'Oops, something went wrong'
  let httpCode = 500

  if (err instanceof AppError) {
    httpCode = err.httpCode
    message = err.message
    console.log(`Error! Error message: ${err.message}`, err)
  }

  if (err instanceof Error) {
    console.log(`Error! Error message: ${err.message}`, err)
  }

  // TODO
  // Use logger

  res.status(httpCode).json({
    message,
  })
  next()
}
