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
                'add-product-tosell-list',
                'load-customer-list',
                'select-customer-whopays',
                'load-orders-window',
                'load-suppliers-window',
                'load-editsupplier-window',
                'load-addsupplier-window',
                'sell-cash-incompleted',
                'delete-supplier',
                'add-supplier',
                'edit-supplier-info',
                'load-buys-window',
                'load-addBuys-window',
                'load-searchproduct-buys-window',
                'load-id-to-buy',
                'buys-product-alreadyadded',
                'product-not-found',
                'added-productbuy',
                'buy-end',
                'load-stock-window',
                'load-addproduct-window',
                'load-editproduct-window',
                'load-deleteproduct-window',
                'load-departments-window',
                'delete-department',
                'new-product',
                'delete-product',
                'get-sells-details',
                'select-customer-for-order',
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
                'add-product-tosell-list',
                'delete-supplier-selected',
                'load-new-supplier',
                'load-edited-supplier',
                'added-to-buy',
                'buy-confirmation',
                'update-departments-list',
                'update-departments-list-delete',
                'update-newproduct-list',
                'confirm-product-delete',
                'update-products-list-bydelete',
                'get-sells-details',
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
                'get-id-forsell-list',
                'get-orders',
                'get-order',
                'get-orders-bydate',
                'get-supplier-added',
                'get-supplier-edited',
                'search-buys-by-date',
                'get-buys-detail',
                'get-added-tobuy',
                'get-suppliers',
                'get-buys-profitandinvestment',
                'get-departments',
                'new-department',
                'get-department-update',
                'deleted-department',
                'get-newproduct-tolist',
                'check-product-existance',
                'get-deleted-id',
            ];
            if(validChannels.includes(channel)) {
                return await ipcRenderer.invoke(channel, args);
            } else {
                console.log(`${channel} IS NOT A VALID CHANNEL`);
            }
        },
    }
);
