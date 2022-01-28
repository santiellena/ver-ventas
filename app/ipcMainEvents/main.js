const { ipcMain, dialog } = require('electron');

const storeDepartments = require('../components/departments/store');
const storeSells = require('../components/sells/store');

const { mainHandlebars,
        historyHandlebars,
        returnMainWindow,
        returnLoginWindow,
        returnSettingsWindow,
        
} = require('../createWindows');

module.exports = ({
    createMainWindow,
    createLoginWindow,
    createSettingsWindow,
}) => {
    
    ipcMain.on('load-page-main', (e, pageName) => {
        const mainWindow = returnMainWindow()
        if( mainWindow != null && mainWindow != undefined ) {
            mainWindow.loadFile(mainHandlebars.render(pageName));
        } else {
            console.log('Is still undefinded');
        }
        
    });
    
    ipcMain.on('load-stats-page', () => {
        const mainWindow = returnMainWindow()
        if( mainWindow != null && mainWindow != undefined ) {
            const actualDate = new Date();
            let month = '';
            if((actualDate.getMonth()+1).toString().length == 1){
                month = `0${actualDate.getMonth()+1}`;
            } else {
                month = actualDate.getMonth()+1;
            };
            const fromDate =  `${actualDate.getFullYear()}/${month}/${actualDate.getDate()}`;
            const toDate = `${actualDate.getFullYear()}/${month}/${actualDate.getDate()}`;
            const {departments, gains, amountOfSells} = storeSells.getGainsByDepartment(fromDate, toDate);
            let bestDepartment = {};
            let bet = 0;
            for (const dep of departments) {
                if(dep.gains > bet){
                    bet = dep.gains;
                    bestDepartment.name = dep.description;
                    bestDepartment.percentage = parseInt(dep.percentage);
                };
            };
            mainWindow.loadFile(mainHandlebars.render('/stats/stats.hbs', {departments, gains, amountOfSells, bestDepartment, fromDate, toDate}));
        };
    });

    ipcMain.on('load-stats-change-date', (e, {fromDate, toDate}) => {
        const mainWindow = returnMainWindow()
        if( mainWindow != null && mainWindow != undefined ) {
            const {departments, gains, amountOfSells} = storeSells.getGainsByDepartment(fromDate, toDate);
            let bestDepartment = {};
            let bet = 0;
            for (const dep of departments) {
                if(dep.gains > bet){
                    bet = dep.gains;
                    bestDepartment.name = dep.description;
                    bestDepartment.percentage = parseInt(dep.percentage);
                };
            };
            mainWindow.loadFile(mainHandlebars.render('/stats/stats.hbs', {departments, gains, amountOfSells, bestDepartment, fromDate, toDate}));
        };
    });

    ipcMain.on('logout', (e, args) => {
        createLoginWindow();
    });

    ipcMain.on('fullscreen-mainwindow', (e, args) => {

    });

    ipcMain.on('load-settings', (e, args) => {
        createSettingsWindow();
     });
}