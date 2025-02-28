export class AppError extends Error {
  constructor(message, name, httpCode) {
    super(message)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AppError)
    }
    this.name = name
    this.httpCode = httpCode
  }
}

export class NotFoundError extends AppError {
  constructor(resource) {
    super(`${resource} was not found`, 'NotFoundError', 404)
  }
}

export class NotAuthorisedError extends AppError {
  constructor() {
    super(`Not authorised to get requested content`, 'NotAuthorisedError', 401)
  }
}
export class BadRequestError extends AppError {
  constructor(typeOfInput) {
    super(`${typeOfInput} has the wrong format`, 'BadRequestError', 400)
  }
}
