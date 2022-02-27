import { Request, Response } from 'express'
import createUser from './services/CreateUser'

export function helloWorld (request: Request, response: Response) {
  const user = createUser({
    name: 'Michel', 
    email: 'mich@dev.com', 
    password: '1234', 
    techs: [
      'Node.js',
      { title: 'Typescript', experience: 100 }
    ] 
  })

  return response.json({ message: 'Hello World' })
}
