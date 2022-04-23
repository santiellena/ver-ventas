const { ipcMain, dialog, app } = require('electron');
const axios = require('axios');
const config = require('../config/config');
const auth = require('../config/auth');

const fs = require('fs');

const network = fs.readFileSync(`${__dirname}/../config/network.json`, {encoding: 'utf-8'}, (err, data) => {
    if(err) {
        throw new Error(err);
    } else {
        return JSON.parse(data);
    };
});

function getUrl () {
    const net = JSON.parse(network);
    return net.url;
};


const { mainHandlebars,
        historyHandlebars,
        returnMainWindow,
} = require('../createWindows');

module.exports = ({
}) => {

    ipcMain.on('dump-database', async () => {
        const mainWindow = returnMainWindow();

        const response = dialog.showMessageBoxSync(mainWindow, {
            title: 'Guardar Backup Localmente',
            message: 'Confirme si desea hacer un backup en el servidor',
            buttons: ['Confirmar', 'Cancelar'],
        });
        if(response == 0){
                const response = await axios({
                    method: 'GET',
                    url: `${getUrl()}/api/dump`,
                    headers: {
                        authorization: `Bearer ${await auth.getSessionToken()}`,
                    },
                });
                if(response.data.message){
                    dialog.showMessageBox(mainWindow, {
                        title: 'Backup fallido',
                        message: 'La descarga del backup de la base de datos ha fallado. Reintente nuevamente.'
                    });
                } else {
                    dialog.showMessageBox(mainWindow, {
                        title: 'Backup realizado',
                        message: 'La descarga del backup de la base de datos ha sido completada en el servidor.'
                    });
                };  
        };
    });

};