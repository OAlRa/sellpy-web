import { NotFoundError } from '../errors/customErrors.js'

export const notFound = (req, res, next) => {
  next(new NotFoundError(`Route: ${req.url}`))
}
