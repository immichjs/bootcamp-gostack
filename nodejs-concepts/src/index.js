require('dotenv').config()
const express = require('express')
const { v4: uuid } = require('uuid')
const logRequest = require('./middlewares/logRequest')
const { validateProjectId } = require('./middlewares/validations')
const projects = require('./database/projects')
const app = express()
const port = process.env.PORT

app.use(express.json())
app.use(logRequest)


app.get('/projects', (request, response) => {
  const { tech } = request.query

  const results = tech
    ? projects.filter(project => project.tech.includes(tech))
    : projects

  return response.json(results)
})

app.post('/projects', (request, response) => {
  const { tech } = request.body
  const project = { tech, id: uuid() }
  projects.push(project)

  return response.json(tech)
})

app.put('/projects/:id', [validateProjectId], (request, response) => {
  const { tech } = request.body
  const { projectIndex } = request
  
  projects[projectIndex].tech = tech

  return response.json(tech)
})

app.delete('/projects/:id', [validateProjectId], (request, response) => {
  const { projectIndex } = request

  projects.splice(projectIndex, 1)

  return response.status(204).send()
})

app.listen(port, () => console.log(`http://localhost:${port}`))
