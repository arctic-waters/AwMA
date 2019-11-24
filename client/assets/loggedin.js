const { ipcRenderer } = require('electron')
const $ = require('jquery')

ipcRenderer.send('info')

ipcRenderer.on('info', (event, data) => {
  $('#name').html('Your ID: ' + data.id)
  $('#id').html('Room ID: ' + data.room)
  $('#refresh').html(`Refresh: ${1 / data.wait}fps`)
})

function logout() {
  ipcRenderer.send('logout')
}