const { app, BrowserWindow, Menu } = require("electron");
const path = require('path');
const handlebarsHbs = require('electron-hbs');
 
// initialization Custom handlebars
const newHandlebars = new handlebarsHbs(
    path.join(__dirname, '/renderer/html'),
    path.join(__dirname, '/renderer/html', 'layout'),
    'main.hbs',
    path.join(__dirname, '/renderer/html', 'temp')
);
 
// Declaratios of windows
let mainMindow;
let settingsWindow;
 
// Main window
app.on("ready", () => {
    mainMindow = new BrowserWindow({
        webPreferences: {
          
        }
    })
    mainMindow.loadFile(newHandlebars.render('index.hbs', {
    }));
    mainMindow.on("closed", () => {
        app.quit()
    });
});
 
// removes all rendered files 
app.on("quit", () => {
    newHandlebars.clearTemps();
});
 
// New product window
function createNewProductWindow() {
    settingsWindow = new BrowserWindow({
        width: 3060,
        height: 1080,
        title: 'VerSystem',
        webPreferences: {
          
        }
    });
    newProductWindow.loadFile(newHandlebars.render(__dirname, '/renderer/html/try.hbs'));
    newProductWindow.on("closed", () => {
        newProductWindow = null;
    });
};
 