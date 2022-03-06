function selectCustomer (id) {
        const totalAmount = window.totalAmount;
        const totalAmountPlusDebt = window.totalAmountPlusDebt;
        const howPaid = window.howPaid;
        const operation = window.operation;
        if(id != null && id != undefined && totalAmount != null && totalAmount != undefined && totalAmountPlusDebt != null && totalAmountPlusDebt != undefined && howPaid != undefined && howPaid != null){
            if(operation == 'pay'){
                ipcRenderer.send('select-customer-whopays', {id, totalAmount, totalAmountPlusDebt, howPaid});  
            } else if (operation == 'order'){
                ipcRenderer.send('select-customer-for-order', {id, totalAmount});
            } else if(operation == 'pay-order'){
                ipcRenderer.send('select-customer-whopays-order', {id, totalAmount, totalAmountPlusDebt, howPaid});  
            };
        };
};