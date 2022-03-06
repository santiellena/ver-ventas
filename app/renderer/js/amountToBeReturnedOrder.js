let totalAmount = document.getElementById('total-amount').innerText;
//Enviar update a la caja mediante un ipcRenderer.send()

function updateBoxBOSell (amount) { //Update box because of sell
    ipcRenderer.send('update-box-bo-sell', amount);
};

//Print the amount to be returned when the customer pays with cash
function amountToReturn () {
    const spanReturn = document.getElementById('return-amount');
    const howMuchCash = document.getElementById('cash').value;

    const amountToBeReturned = howMuchCash - totalAmount;

    spanReturn.innerText = amountToBeReturned.toFixed(2);
};

function getMoney () {
    if(totalAmount != null && totalAmount != undefined && totalAmount != 0){
        const howMuchCash = document.getElementById('cash').value;
        const amountToBeReturned = howMuchCash - totalAmount;
        const sessionStorage = getAllItemSession();
        const priceList = document.getElementById('priceList').value;
        const idCustomer = document.getElementById('idCustomer').value;
        const invoicing = document.getElementById('invoicing');
    let iValue = 0;
    if(invoicing.checked == true){
        iValue = 1;
    };
    if(amountToBeReturned < 0 && howMuchCash != ''){
        const debt = amountToBeReturned * (-1);
        const debtFixed = debt.toFixed(2);
        ipcRenderer.send('send-details-order-incompleted', {debt: debtFixed, invoicing: iValue, sessionStorage, priceList, idCustomer, totalAmount});
    } else if( howMuchCash == '' || howMuchCash == 0){
        ipcRenderer.send('send-details-order-cash', {totalAmount, amountToBeReturned: 0, sessionStorage, howMuchCash: totalAmount, idCustomer,invoicing: iValue});
    } else {
        ipcRenderer.send('send-details-order-cash', {totalAmount, amountToBeReturned, howMuchCash, invoicing: iValue, sessionStorage, idCustomer});
    };

    } else {
        alert('EL MONTO DEBE SER MAYOR A $0');
    }
};

document.getElementById('cash').addEventListener('keydown',  e => { 
    if(e.key == 'Enter'){
        if(totalAmount != null && totalAmount != undefined && totalAmount != 0){
            const howMuchCash = document.getElementById('cash').value;
            const amountToBeReturned = howMuchCash - totalAmount;
            const sessionStorage = getAllItemSession();
            const priceList = document.getElementById('priceList').value;
            const idCustomer = document.getElementById('idCustomer').value;
            const invoicing = document.getElementById('invoicing');
        let iValue = 0;
        if(invoicing.checked == true){
            iValue = 1;
        };
        if(amountToBeReturned < 0 && howMuchCash != ''){
            const debt = amountToBeReturned * (-1);
            const debtFixed = debt.toFixed(2);
            ipcRenderer.send('send-details-order-incompleted', {debt: debtFixed, invoicing: iValue, sessionStorage, priceList, idCustomer, totalAmount});
        } else if( howMuchCash == '' || howMuchCash == 0){
            ipcRenderer.send('send-details-order-cash', {totalAmount, amountToBeReturned: 0, sessionStorage, howMuchCash: totalAmount, idCustomer,invoicing: iValue});
        } else {
            ipcRenderer.send('send-details-order-cash', {totalAmount, amountToBeReturned, howMuchCash, invoicing: iValue, sessionStorage, idCustomer});
        };
        } else {
            alert('EL MONTO DEBE SER MAYOR A $0');
        }
    }
});

function payWithCard () {
    if(totalAmount != null && totalAmount != undefined && totalAmount != 0){
        const sessionStorage = getAllItemSession();
        const priceList = document.getElementById('priceList').value;
        const idCustomer = document.getElementById('idCustomer').value;
        ipcRenderer.send('send-details-order-card', {sessionStorage, priceList, totalAmount, idCustomer});
    } else {
        alert('EL MONTO DEBE SER MAYOR A $0');
    };
};

function payWithCredit () {
    if(totalAmount != null && totalAmount != undefined && totalAmount != 0){
        const invoicing = document.getElementById('invoicing');
        let iValue = 0;
        if(invoicing.checked == true){
            iValue = 1;
        };
        const sessionStorage = getAllItemSession();
        const priceList = document.getElementById('priceList').value;
        const idCustomer = document.getElementById('idCustomer').value;
        ipcRenderer.send('send-details-order-credit', {sessionStorage, priceList, invoicing: iValue, totalAmount, idCustomer});
    } else {
        alert('EL MONTO DEBE SER MAYOR A $0');
    }
};

async function onLoadSetItems () {
    const details = await ipcRenderer.invoke('get-order-details');
    for (const det of details) {
        setItemSession(det.idProduct, det.quantity); 
    };
};
onLoadSetItems();