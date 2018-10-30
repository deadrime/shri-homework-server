import {Request, Response, NextFunction} from 'express'

const notFoundMiddleware = (req: Request, res: Response, next: NextFunction) => {
  res.status(404).send('<h1>Page not found</h1>')
}

module.exports = notFoundMiddleware
