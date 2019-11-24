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

ipcMain.on('login', (event: IpcMainEvent, name: string, id: string) => start(id, name))

ipcMain.on('logout', (event: IpcMainEvent) => end)

ipcMain.on('logged in', e => e.reply('logged in', info() != null))
ipcMain.on('info', e => e.reply('info', info()))