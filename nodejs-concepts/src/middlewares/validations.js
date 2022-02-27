const projects = require('../database/projects')
const { validate } = require('uuid')

function validateProjectId (request, response, next) {
  const { id } = request.params

  if (!validate(id)) {
    return response.status(400).json({ message: 'This ID is not valid.' })
  }

  const projectIndex = projects.findIndex(project => project.id === id)
  if (projectIndex < 0) {
    return response.status(400).json({ message: 'Project not found.' })
  } else {
    request.projectIndex = projectIndex
    return next()
  }
}

module.exports = { validateProjectId }
