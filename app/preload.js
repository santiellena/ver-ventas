const { ipcRenderer, contextBridge } = require('electron');

contextBridge.exposeInMainWorld(
    "app", {
        send: (channel, data) => {
            let validChannels = [
                'login',
                'load-page-main',
                'logout',
                'fullscreen-mainwindow',
                'load-settings',
                'open-sells-history',
                'load-payment-window',
                'load-search-products-window',
                'update-box-bo-sell',
                'sell-cash-confirmation',
                'sell-card-confirmation',
                'update-product-quantity-cookies',
                'add-product-list-cookies',
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
                'receive-total-amount',
                'clear-product-list',
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
                'get-sell-detail',
                'search-sells-by-date',
                'get-product-list',
                'search-product-byid',
                'check-product-incookies',
                'get-tax-percentage',

            ];
            if(validChannels.includes(channel)) {
                return await ipcRenderer.invoke(channel, args);
            } else {
                console.log(`${channel} IS NOT A VALID CHANNEL`);
            }
        },
    }
);
