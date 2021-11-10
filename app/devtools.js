const electronDebug = require('electron-debug')

module.exports = function devtools () {
  // Mostrando las herramientas de DevTools para las diferentes ventanas
  electronDebug({ showDevTools: false});
}