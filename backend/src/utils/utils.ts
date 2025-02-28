import { BadRequestError } from '../errors/customErrors.ts'

export const validateParams = (requiredParams: string[]): void => {
  requiredParams.forEach((param) => {
    if (!param) {
      throw new BadRequestError(param)
    }
  })
}
