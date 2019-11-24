const { ipcRenderer } = require('electron')
const $ = require('jquery')

function login() {
  const name = $('#name').val()
  const id = $('#id').val()

  ipcRenderer.send('login', name, id)
}