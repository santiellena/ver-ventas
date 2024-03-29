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
                'edit-product',
                'load-customers-window',
                'load-addcustomer-window',
                'load-editcustomer-window',
                'load-deletecustomer-window',
                'add-customer',
                'edit-customer',
                'delete-customer',
                'load-paydebts-window',
                'load-listdebts-window',
                'payDebt-cash',
                'payDebt-card',
                'payDebt-transference',
                'load-cashflowhistory-window',
                'load-cashflowin-window',
                'load-cashflowout-window',
                'add-cashflow-in',
                'add-cashflow-out',
                'load-general-window',
                'load-branches-window',
                'load-employees-window',
                'load-addemplooy-window',
                'load-editemplooy-window',
                'add-emplooy',
                'delete-emplooy',
                'load-users-window',
                'load-edituser-window',
                'load-adduser-window',
                'delete-user',
                'add-user',
                'dump-database',
                'load-docs-window',
                'load-units-window',
                'delete-docType',
                'delete-unitMeasure',
                'load-sales-page',
                'load-addsale-page',
                'load-stats-page',
                'load-missing-stock-window',
                'fullscreen-mainwindow',
                'add-sell-from-order',
                'get-sells-details-card',
                'get-sells-details-credit',
                'sell-cash-incompleted-order',
                'sell-cash-confirmation-order',
                'select-customer-whopays-order',
                'send-details-order-credit',
                'delete-order',
                'get-sells-details-order',
                'send-details-order-incompleted',
                'send-details-order-cash',
                'send-details-order-card',
                'load-locations-window',
                'delete-location-exposition',
                'delete-location-store'
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
                'confirm-product-edit',
                'update-products-list-byedit',
                'update-customer-list-fromadd',
                'confirm-added-customer',
                'update-customer-list-fromedit',
                'confirm-edited-customer',
                'confirm-customer-delete',
                'update-customers-list-bydelete',
                'load-new-payment',
                'confirm-cashflow-in',
                'confirm-cashflow-out',
                'load-new-emplooy',
                'delete-emplooy-selected',
                'load-edited-emplooy',
                'update-userslist-bydelete',
                'update-userslist-bynew',
                'load-new-sale',
                'load-login-info',
                'get-sells-details-card',
                'get-sells-details-credit',
                'send-sell-details-order',
                'confirm-order-sell',
                'send-sell-details-order-credit',
                'get-sells-details-order',
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
                'get-supplier',
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
                'get-modified-id',
                'delete-buy',
                'delete-sell',
                'delete-order',
                'get-departments-byprovince',
                'get-cities-bydepartment',
                'check-customer-existance',
                'get-added-customer-update',
                'get-edited-customer',
                'get-customer',
                'get-idcustomer-deleted',
                'get-sells-by-customer',
                'get-payments-by-customer',
                'check-url',
                'join-branch',
                'get-limit-cashout-amount',
                'update-general-info',
                'update-branch-info',
                'get-added-emplooy',
                'edit-emplooy',
                'get-edited-emplooy',
                'get-branches-selected-byuser',
                'get-user-permissions',
                'get-user-deleted',
                'get-all-branches',
                'get-added-user',
                'new-docType',
                'new-unitMeasure',
                'get-cash-cashRegister',
                'get-product-discount',
                'add-sale',
                'get-new-sale',
                'delete-sale',
                'get-login-info',
                'edit-user',
                'get-branches',
                'get-order-details',
                'new-location-exposition',
                'new-location-store',
                'search-products-bydescription',
                'search-products-bypartid',
                'sell-history-change',
                'products-history-change',
                'products-missing-change',
                'movements-history-change',
            ];
            if(validChannels.includes(channel)) {
                return await ipcRenderer.invoke(channel, args);
            } else {
                console.log(`${channel} IS NOT A VALID CHANNEL`);
            }
        },
    }
);
