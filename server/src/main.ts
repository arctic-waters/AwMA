import express from 'express'

import { Room } from './model/Room'

const app = express()

app.enable('case sensitive routing')
app.enable('trust proxy')

app.disable('strict routing')
app.disable('x-powered-by')

app.use(express.json({limit: '50mb'}))
app.use(express.urlencoded({ extended: true, limit: '50mb' }))

// dsaiojfhoiauseiugfhasdihuogfhiobyuladsfgihylbnef

let rooms: Room[] = [ new Room('asfdljk;asdfl;kjafsdlk;j', 'abc') ]

export const getRooms = () => rooms
export const setRooms = (v: Room[]) => rooms = v
export const addRoom = (c: Room) => rooms.push(c)

// IOGfhieasughbuaidfgiusdfuihlbg

import { api as clientRoutes } from './routes/client'
app.use('/client', clientRoutes)

// iojasgiohasre unikjg uikasdfg;onhi

app.listen(3000, () => {
  console.log('yes')
})