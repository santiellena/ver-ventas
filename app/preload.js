const { ipcRenderer, contextBridge } = require('electron');

contextBridge.exposeInMainWorld(
    "app", {
        send: (channel, data) => {
            let validChannels = [
                'login',
            ];
            if(validChannels.includes(channel)) {
                ipcRenderer.send(channel, data);
            }
        },
        on: (channel, func) => {
            let validChannels = [
                'login-success',
            ];
            if(validChannels.includes(channel)) {
                ipcRenderer.on(channel, (e, ...args) => func(...args))
            }
        },
        invoke: async (channel, args) => {
            let validChannels = [
                'login',
            ];
            if(validChannels.includes(channel)) {
                return await ipcRenderer.invoke(channel, args);
            }
        },
    }
);
