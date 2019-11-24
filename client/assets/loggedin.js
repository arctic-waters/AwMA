const { ipcRenderer } = require('electron')
const $ = require('jquery')

ipcRenderer.send('info')

ipcRenderer.on('info', (event, data) => {
  $('#name').html(data.id)
  $('#id').html(data.room)
  $('#refresh').html(`${1 / data.wait}fps`)
})

function logout() {
  ipcRenderer.send('logout')
}