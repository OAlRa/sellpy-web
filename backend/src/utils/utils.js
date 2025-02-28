import { BadRequestError } from '../errors/customErrors.js'

export const validateParams = (requiredParams) => {
  requiredParams.forEach((param) => {
    if (!param) {
      throw new BadRequestError(param)
    }
  })
}
