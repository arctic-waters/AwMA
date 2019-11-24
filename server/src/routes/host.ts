import path from 'path'

import { Router, Request, Response } from 'express'
import uuid from 'uuid/v4'

import { getRooms } from '../main'
import { User } from '../model/User'

const api = Router()

api.get('/users/:room', (req: Request, res: Response): any => {
    const room = getRooms().find(r => r.id == req.params.room)

    if (!room)
      return res.send({ code: 1, error: 'Room does not exist' })
  
    res.send({
        code: 0,
        users: room.clients.map(c => ({ name: c.name, id: c.id }))
    })
})

api.get('/screen/:room/:id/image.jpg', (req: Request, res: Response): any => {
  const room = getRooms().find(r => r.id == req.params.room)

  if (!room)
    return res.send({ code: 1, error: 'Room does not exist' })

  const user = room.clients.find(u => u.id == req.params.id)

  if (!user)
    return res.send({ code: 1, error: 'Invalid user' })

  res.sendFile(path.join(__dirname, '..', '..', 'public', 'screen', `${user.id}.jpg`))
})

api.get('/processes/:room/:id', (req: Request, res: Response): any => {
    const room = getRooms().find(r => r.id == req.params.room)
  
    if (!room)
      return res.send({ code: 1, error: 'Room does not exist' })
  
    const user = room.clients.find(u => u.id == req.params.id)
  
    if (!user)
      return res.send({ code: 1, error: 'Invalid user' })

    res.send(user.dangerousProcesses)
})

api.get('/discon/:room/:id', (req: Request, res: Response): any => {
    const room = getRooms().find(r => r.id == req.params.room)
  
    if (!room)
      return res.send({ code: 1, error: 'Room does not exist' })
  
    const user = room.clients.find(u => u.id == req.params.id)
  
    if (!user)
      return res.send({ code: 1, error: 'Invalid user' })

    res.send(user.dangerousProcesses)
})

export { api }