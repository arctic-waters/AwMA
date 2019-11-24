const { ipcRenderer } = require('electron')
const $ = require('jquery')

ipcRenderer.send('info')

setInterval(() => ipcRenderer.send('logged in'), 2000)

// ipcRenderer.on('info', (event, data) => {
//   ipcRenderer.send('debug', data)

//   $('#name').html('Your Name: ' + data.username)
//   $('#id').html('Room ID: ' + data.roomCode)
//   $('#refresh').html(`Refresh: ${1000 / data.wait}fps`)
// })

ipcRenderer.on('logged in', (event, loggedIn) => {
  if (!loggedIn)
    window.location.href = 'index.html'
})

function logout() {
  ipcRenderer.send('logout')
}