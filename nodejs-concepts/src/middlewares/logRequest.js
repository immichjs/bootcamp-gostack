function logRequest (request, response, next) {
  const { method, url } = request

  const logLabel = `[${method}]: ${url}`
  console.time(logLabel)
  next()
  console.timeEnd(logLabel)
}

module.exports = logRequest
