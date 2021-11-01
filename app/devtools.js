const { enableLiveReload } = require('electron-compile');
const electronDebug = require('electron-debug')

module.exports = function devtools () {
  enableLiveReload()
  // Mostrando las herramientas de DevTools para las diferentes ventanas
  electronDebug({ showDevTools: true })
}