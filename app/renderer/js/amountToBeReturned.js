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
        ipcRenderer.send('sell-cash-confirmation', totalAmount);
    } else {
        alert('EL MONTO DEBE SER MAYOR A $0');
    }
};

function payWithCard () {
    if(totalAmount != null && totalAmount != undefined && totalAmount != 0){
        ipcRenderer.send('sell-card-confirmation', totalAmount);
    } else {
        alert('EL MONTO DEBE SER MAYOR A $0');
    }
};

function payWithCredit () {
    if(totalAmount != null && totalAmount != undefined && totalAmount != 0){
        ipcRenderer.send('load-customer-list', totalAmount);
    } else {
        alert('EL MONTO DEBE SER MAYOR A $0');
    }
};

