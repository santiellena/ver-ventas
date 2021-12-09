function selectCustomer (id) {
        const totalAmount = window.totalAmount;
        if(id != null && id != undefined && totalAmount != null && totalAmount != undefined){
            ipcRenderer.send('select-customer-whopays', {id, totalAmount});  
        };
        console.log(totalAmount);
};