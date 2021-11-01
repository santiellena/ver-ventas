const { ipcRenderer, contextBridge } = require('electron');

contextBridge.exposeInMainWorld(
    "app", {
        send: (channel, data) => {
            let validChannels = [
                'login',
                'load-page-main',
            ];
            if(validChannels.includes(channel)) {
                ipcRenderer.send(channel, data);
            } else {
                console.log(`${channel} IS NOT A VALID CHANNEL`);
            }
        },
        on: (channel, func) => {
            let validChannels = [
                'login-success',
            ];
            if(validChannels.includes(channel)) {
                ipcRenderer.on(channel, (e, ...args) => func(...args))
            } else {
                console.log(`${channel} IS NOT A VALID CHANNEL`);
            }
        },
        invoke: async (channel, args) => {
            let validChannels = [
                'login',
            ];
            if(validChannels.includes(channel)) {
                return await ipcRenderer.invoke(channel, args);
            } else {
                console.log(`${channel} IS NOT A VALID CHANNEL`);
            }
        },
    }
);
