import { AppError } from '../errors/customErrors.ts'
import type { NextFunction, Request, Response } from 'express'

export const errorHandler = (err: unknown, req: Request, res: Response, next: NextFunction) => {
  let message = 'Oops, something went wrong'
  let httpCode = 500

  if (err instanceof AppError) {
    httpCode = err.httpCode
    message = err.message

    res.status(httpCode).json({
      message,
      httpCode,
      name: err.name,
    })
    if (httpCode >= 400 && httpCode < 500) {
      req.log.warn(err, `${err.name} - Message: ${err.message}`)
    }
    return
  }

  if (err instanceof Error) {
    message = err.message
  }

  req.log.error(err, message)
  res.status(httpCode).json({
    message,
  })
}
