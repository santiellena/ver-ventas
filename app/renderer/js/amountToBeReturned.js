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
    ipcRenderer.send('sell-cash-confirmation', totalAmount);
};

function payWithCard () {
    ipcRenderer.send('sell-card-confirmation', totalAmount);
};

function payWithCredit () {
    ipcRenderer.send('load-customer-list', '');
};

