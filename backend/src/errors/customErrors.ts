interface IAppError {
  httpCode: number
}

type HttpCode = 200 | 201 | 400 | 401 | 403 | 404 | 500

export class AppError extends Error implements IAppError {
  public readonly httpCode: number
  constructor(message: string, name: string, httpCode: HttpCode) {
    super(message)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AppError)
    }
    this.name = name
    this.httpCode = httpCode
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string) {
    super(`${resource} was not found`, 'NotFoundError', 404)
  }
}

export class NotAuthorisedError extends AppError {
  constructor() {
    super(`Not authorised to get requested content`, 'NotAuthorisedError', 401)
  }
}
export class BadRequestError extends AppError {
  constructor(typeOfInput: string) {
    super(`${typeOfInput} has the wrong format`, 'BadRequestError', 400)
  }
}
