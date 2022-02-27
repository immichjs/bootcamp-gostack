require('dotenv').config()
const express = require('express')
const cors = require('cors')
const { v4: uuid } = require('uuid')
const app = express()
const repositories = require('./database/repositories')
const { validateRepositoryId } = require('./middlewares/validations')

app.use(express.json())
app.use(cors())

app.get('/repositories', (request, response) => {
  return response.json(repositories)
})

app.post('/repositories', (request, response) => {
  const { title, url, techs } = request.body

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  }

  repositories.push(repository)
  return response.json(repository)
})

app.put('/repositories/:id', [validateRepositoryId], (request, response) => {
  const { id } = request.params
  const { repositoryIndex } = request
  const { title, url, techs } = request.body


  const repository = {
    id,
    title,
    url,
    techs,
    likes: repositories[repositoryIndex].likes
  }

  repositories[repositoryIndex] = repository

  return response.json({ ...repository })
})

app.delete('/repositories/:id', [validateRepositoryId], (request, response) => {
  const { repositoryIndex } = request

  repositories.splice(repositoryIndex, 1)

  return response.status(204).send()
})

app.post('/repositories/:id/like', [validateRepositoryId], (request, response) => {
  const { repositoryIndex } = request

  repositories[repositoryIndex].likes++

  return response.json({ ...repositories[repositoryIndex] })
})

module.exports = app
