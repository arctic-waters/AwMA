import * as path from 'path'
import { menubar } from 'menubar'
import { ipcMain, IpcMainEvent } from 'electron'
import { start, end, info } from './net'

const menu = menubar({
  dir: path.join(__dirname, '..', 'assets'),
  browserWindow: {
    webPreferences: {
      nodeIntegration: true
    }
  },
  // tooltip: 'AwMA',
  preloadWindow: true
})

menu.on('ready', () => {
  console.log('ready')
})

ipcMain.on('debug', (event, data) => {
  console.log(data)
})

ipcMain.on('login', (event: IpcMainEvent, name: string, id: string) => start(name, id))
ipcMain.on('logout', end)

ipcMain.on('logged in', e => e.reply('logged in', info().connected))
ipcMain.on('info', e => e.reply('info', info()))