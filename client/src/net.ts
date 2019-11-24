import fs from 'fs'
import path from 'path'

import axios from 'axios'
import ps from 'ps-list'
import request from 'request-promise'

const screen = require('screenshot-desktop')

const server = 'http://127.0.0.1:3000/client/'

let id: string
let room: string

let wait: number = 2000
let psWait: number = 5000

let connected: boolean = false

async function send() {
  try {
    await screen({ format: 'jpg', filename: path.join(__dirname, `${id}.jpg`) })

    let data = await request(server + '/screen', {
      method: 'POST',
      formData: {
        room,
        id,
        file: fs.createReadStream(path.join(__dirname, `${id}.jpg`))
      }
    })

    console.log('send', data)

    if (connected)
      setTimeout(send, wait)
  } catch (e) {
    connected = false
  }
}

async function processes() {
  try {
    const list = await ps()

    await axios.post(server + '/processes', { id, room, processes: list })

    if (connected)
      setTimeout(processes, wait)
  } catch (e) {
    connected = false
  }
}

async function heart() {
  try {
    let { data } = await axios.post(server + '/heartbeat', { id, room })

    wait = data.refresh * 1000
    psWait = data.processRefresh
    connected = !data.disconnect

    if (connected)
      setTimeout(heart, 1000)
  } catch (e) {
    connected = false
  }
}


export async function start(name: string, identifier: string) {
  let { data } = await axios.post(server + '/connect', { room: name, id: identifier })

  id = data.id
  room = data.room
  
  connected = true

  heart()

  setTimeout(send, wait)
  setTimeout(processes, psWait)
}

export function end() {
  connected = false
}

export const info = () => connected ? { id, room, wait, psWait } : undefined