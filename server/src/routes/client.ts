import { Router, Request, Response } from 'express'
import multer from 'multer'
import uuid from 'uuid/v4'

import { getRooms } from '../main'
import { User } from '../model/User'

const upload = multer({ storage: multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'public/screen/'),
  filename: (req, file, cb) => cb(null, file.originalname)
}) })

const api = Router()

api.post('/connect', (req: Request, res: Response): any => {
  const room = getRooms().find((r) => r.call == req.body.room)

  if (!room)
    return res.send({ code: 1, error: 'Invalid Room!' })

  const id = uuid()

  room.clients.push(new User(id, req.body.name))

  res.send({ code: 0, id, room: room.id })
})

api.post('/heartbeat', (req: Request, res: Response): any => {
  const room = getRooms().find((r) => r.id == req.body.room)
  
  if (!room)
    return res.send({ code: 1, error: 'Room does not exist' })

  res.send({
    refresh: room.refreshRate,
    processRefresh: room.processRefreshRate,
    disconnect: !room.clients.some(v => v.id === req.body.id)
    // highRefresh: room.highRefreshRate,
    // viewing: false
  })
})

api.post('/screen', upload.single('file'), (req: Request, res: Response): any => {
  if (!req.file)
    return res.send({ code: 1, error: 'No file attached' })

  const room = getRooms().find(r => r.id == req.body.room)
  
  if (!room)
    return res.send({ code: 1, error: 'Room does not exist' })

  const user = room.clients.find(u => u.id == req.body.id)

  if (!user)
    return res.send({ code: 1, error: 'Invalid user' })

  user.latestFile = req.file

  res.send({ code: 0 })
})

api.post('/processes', (req: Request, res: Response): any => {
  if (!req.body.processes)
    return res.send({ code: 1, error: 'No processes' })

  const room = getRooms().find(r => r.id == req.body.room)

  if (!room)
    return res.send({ code: 1, error: 'Room does not exist' })

  const user = room.clients.find(u => u.id == req.body.id)

  if (!user)
    return res.send({ code: 1, error: 'Invalid user' })

  user.latestProcesses = req.body.processes

  console.log(user.latestProcesses)

  res.send({ code: 0 })
})

api.post('/disconnect', (req: Request, res: Response): any => {
  const room = getRooms().find(r => r.id == req.body.room)

  if (!room)
    return res.send({ code: 1, error: 'Room does not exist' })

  const user = room.clients.find(u => u.id == req.body.id)

  if (!user)
    return res.send({ code: 1, error: 'Invalid user' })

  room.clients.filter(v => v.id !== user.id)

  res.send({ code: 0 })
})

export { api }