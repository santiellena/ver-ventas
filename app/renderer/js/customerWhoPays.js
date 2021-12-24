function selectCustomer (id) {
        const totalAmount = window.totalAmount;
        const totalAmountPlusDebt = window.totalAmountPlusDebt;
        const howPaid = window.howPaid;
        if(id != null && id != undefined && totalAmount != null && totalAmount != undefined && totalAmountPlusDebt != null && totalAmountPlusDebt != undefined && howPaid != undefined && howPaid != null){
            ipcRenderer.send('select-customer-whopays', {id, totalAmount, totalAmountPlusDebt, howPaid});  
        };

        ipcRenderer.removeAllListeners('select-customer-whopays');
};