// Modules
const { app, BrowserWindow, Tray, Menu, ipcMain } = require('electron');
const path = require('path');
const handlebarsHbs = require('esanti-electron-hbs');

// Declaratios of windows
let mainMindow, loginWindow;
let tray;

function createTray () {
  tray = new Tray('./renderer/images/user.png');

  const contextMenu = Menu.buildFromTemplate([
    { role: 'quit' },
  ]);
  tray.setToolTip('VerSystem');
  tray.setContextMenu(contextMenu);
}
 
// initialization Custom handlebars
const newHandlebars = new handlebarsHbs(
    path.join(__dirname, '/renderer/html'),
    path.join(__dirname, '/renderer/html', 'layout'),
    'main.hbs',
    path.join(__dirname, '/renderer/html', 'temp'),
    path.join(__dirname, '/renderer/html', 'partials'),
    {
      navMenu: 'navMenu.hbs',
    },
);

function createLoginWindow () {
  createTray();
  loginWindow = new BrowserWindow({
    width: 800, height: 600,
    webPreferences: { 
      nodeIntegration: false,
      contextIsolation: true,
      preload: `${__dirname}/preload.js`,
    },
  });

  loginWindow.loadFile(`${__dirname}/renderer/html/login.html`);

  // Open DevTools - Remove for PRODUCTION!
  loginWindow.webContents.openDevTools();

  loginWindow.on('closed',  () => {
    loginWindow = null;
  });
}

// Create a new BrowserWindow when `app` is ready
function createMainWindow  () {
  mainWindow = new BrowserWindow({
    width: 2000, height: 1800,
    webPreferences: { 
      nodeIntegration: false,
      preload: `${__dirname}/preload.js`,
    }
  });
// Load index.html into the new BrowserWindow
mainWindow.loadFile(newHandlebars.render('index.hbs'));

// Open DevTools - Remove for PRODUCTION!
mainWindow.webContents.openDevTools();

 // Listen for window being closed
mainWindow.on('closed',  () => {
  mainWindow = null;
});

}
// Main window
app.on('ready', createLoginWindow);

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
    newHandlebars.clearTemps();
})

ipcMain.handle('login', (e, args) => {
  const { username, password } = args;
  if(username == 'admin' &&  password == 'admin'){ 
  
    
    createMainWindow();
    return true;
  } else {
    
    return false;
  }
});