const errorMiddleware = (err, req, res, next) => {
  console.error(err.message)
  if (!err.statusCode) err.statusCode = 500
  res.status(err.statusCode).send(err.message)
}

module.exports = errorMiddleware
