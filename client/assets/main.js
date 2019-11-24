const { ipcRenderer } = require('electron')
const $ = require('jquery')

ipcRenderer.send('logged in')

function login() {
  const name = $('#name').val()
  const id = $('#id').val()

  ipcRenderer.send('login', name, id)
}

ipcRenderer.on('logged in', (e, loggedIn) => {
  if (loggedIn) {
    window.location.href = 'loggedin.html'
  }
})