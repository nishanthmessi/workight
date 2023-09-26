export const errorHandler = (req, res, err, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode
  let message = err.message

  // Mongoose not found error handler
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    statusCode = 404
    message = 'Resource not found'
  }

  res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  })

  next()
}

export const notFound = (req, res, next) => {
  const err = new Error(`Not Found - ${req.originalUrl}`)
  res.status(404)
  next(err)
}
