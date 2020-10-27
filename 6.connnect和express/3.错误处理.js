const env = process.env.NODE_ENV || 'development'

function errorHandler(error, req, res, next) {
  res.statusCode = 500
  if (env === 'development') {
    console.error('Error:')
    console.error(error)
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(error))
  } else {
    res.end('Server error')
  }
}

module.exports = errorHandler
