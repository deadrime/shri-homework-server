import {Request, Response, NextFunction} from 'express'
import {APIError, APIErrorType} from '../helpers/Error'

const errorMiddleware = (err: APIErrorType, req: Request, res: Response, next: NextFunction) => {
  if (!(err instanceof APIError)) {
    err.statusCode = 500
  }
  res.status(err.statusCode).send(err.message)
}

module.exports = errorMiddleware
