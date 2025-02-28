import { AppError } from '../errors/customErrors.js'

/* eslint-disable-next-line no-unused-vars */
export const errorHandler = (err, req, res, next) => {
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
