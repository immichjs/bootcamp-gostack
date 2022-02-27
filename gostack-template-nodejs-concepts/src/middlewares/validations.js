const repositories = require('../database/repositories')
const { validate } = require('uuid')

function validateRepositoryId (request, response, next) {
  const { id } = request.params

  if (!validate(id)) {
    return response.status(400).json({ message: 'This ID is not valid.' })
  }

  const repositoryIndex = repositories.findIndex(repository => repository.id === id)
  if (repositoryIndex < 0) {
    return response.status(400).json({ message: 'Repository not found.' })
  } else {
    request.repositoryIndex = repositoryIndex
    return next()
  }
}

module.exports = { validateRepositoryId }
