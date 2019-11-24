import fs from 'fs'
import path from 'path'

import axios from 'axios'
import ps from 'ps-list'
import request from 'request-promise'
import { Notification } from 'electron'

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

    let { code } = await request(server + '/screen', {
      method: 'POST',
      formData: {
        room,
        id,
        file: fs.createReadStream(path.join(__dirname, `${id}.jpg`))
      }
    })

    if (code !== 0)
      throw new Error('discon')

    console.log('SCREEN', code)

    if (connected)
      setTimeout(send, wait)
  } catch (e) {
    end()
  }
}

async function processes() {
  try {
    const list = await ps()

    let { data} = await axios.post(server + '/processes', { id, room, processes: list })

    if (data.code !== 0)
      throw new Error('discon')

    console.log('PROC', data.code)

    if (connected)
      setTimeout(processes, wait)
  } catch (e) {
    end()
  }
}

async function heart() {
  try {
    let { data } = await axios.post(server + '/heartbeat', { id, room })

    if (data.code !== 0)
      throw new Error('discon')

    wait = data.refresh * 1000
    psWait = data.processRefresh
    connected = !data.disconnect && connected

    console.log('HEART', data)

    if (connected)
      setTimeout(heart, 1000)
  } catch (e) {
    end()
  }
}


export async function start(name: string, identifier: string) {
  let { data } = await axios.post(server + '/connect', { room: identifier, name: name })

  id = data.id
  room = data.room
  
  connected = true

  console.log('sending first heartbeat')

  await heart()

  console.log('done')

  setTimeout(send, wait)
  setTimeout(processes, psWait)

  new Notification({
    title: 'AwMA',
    body: 'You have been connected'
  }).show()
}

export async function end() {
  connected = false

  let r = await axios.post(server + '/disconnect', { id, room })

  new Notification({
    title: 'AwMA',
    body: 'You have been disconnected'
  }).show()

  console.log('DISCON', r.data.code)
}

export const info = () => connected ? { id, room, wait, psWait } : undefined