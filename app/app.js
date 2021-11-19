'use strict'
// Modules
const { app, BrowserWindow, Tray, Menu, ipcMain } = require('electron');
const devTools = require('./devtools');
const ipcMainEvents = require('./ipcMainEvents');

const {
  createLoginWindow,
  createMainWindow, 
  createPaymentWindow,
  createSellsHistoryWindow,
  createSettingsWindow,
} = require('./createWindows');

if(process.env.NODE_ENV == 'development'){
  devTools();
}

// Login window
app.on('ready', createPaymentWindow);

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

function returnMainWindow () {
  return mainWindow;
}

function returnLoginWindow () {
  return loginWindow;
}

function returnSettingsWindow () {
  return settingsWindow;
}

function returnSellsHistoryWindow () {
  return sellsHistoryWindow;
}

function returnPaymentMethod () {
  return paymentWindow;
}

ipcMainEvents({
  createMainWindow,
  createLoginWindow,
  createSettingsWindow,
  createSellsHistoryWindow,
  createPaymentWindow,
  returnMainWindow,
  returnLoginWindow,
  returnSettingsWindow,
  returnSellsHistoryWindow,
  returnPaymentMethod,
});