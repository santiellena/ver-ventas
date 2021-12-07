'use strict'
// Modules
const { app } = require('electron');
const devTools = require('./devtools');

const ipcMainEvents = {
  main: require('./ipcMainEvents/main'),
  sells: require('./ipcMainEvents/sells'),
  
}

const {
  createLoginWindow,
  createMainWindow, 
  createPaymentWindow,
  createSellsHistoryWindow,
  createSettingsWindow,
  createSearchProductsWindow,
  createCustomerListWindow,
} = require('./createWindows');

if(process.env.NODE_ENV == 'development'){
  devTools();
}

// Login window
app.on('ready', createMainWindow);

// Quit when all windows are closed - (Not macOS - Darwin)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

// When app icon is clicked and app is running, (macOS) recreate the BrowserWindow
app.on('activate', () => {
  if (mainWindow === null) createMainWindow();
});
 
// removes all rendered files 
app.on("quit", () => {
    mainHandlebars.clearTemps();
});

ipcMainEvents.main({
  createMainWindow,
  createLoginWindow,
  createSettingsWindow,
});

ipcMainEvents.sells({
  createSellsHistoryWindow,
  createPaymentWindow,
  createSearchProductsWindow,
  createCustomerListWindow,
});