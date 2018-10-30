export interface APIErrorType extends Error {
  statusCode: number
}

export class APIError extends Error {
  statusCode: number = 401

  constructor(message: string, statusCode?: number) {
    super(message)
    if (statusCode)
      this.statusCode = statusCode
  }
}

export default APIError