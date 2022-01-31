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
        const invoicing = document.getElementById('invoicing');
        let iValue = 0;
        if(invoicing.checked == true){
            iValue = 1;
        };
        if(amountToBeReturned < 0){
            const debt = amountToBeReturned * (-1);
            const debtFixed = debt.toFixed(2);
            ipcRenderer.send('sell-cash-incompleted', {debt: debtFixed, invoicing: iValue});
        } else {
            ipcRenderer.send('sell-cash-confirmation', {totalAmount, amountToBeReturned, howMuchCash, invoicing: iValue});
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
    
            if(amountToBeReturned < 0){
                const debt = amountToBeReturned * (-1);
                const debtFixed = debt.toFixed(2);
                ipcRenderer.send('sell-cash-incompleted', {debt: debtFixed, totalAmount});
            } else {
                ipcRenderer.send('sell-cash-confirmation', {totalAmount, amountToBeReturned});  
            };
    
        } else {
            alert('EL MONTO DEBE SER MAYOR A $0');
        }
    }
});

function payWithCard () {
    if(totalAmount != null && totalAmount != undefined && totalAmount != 0){
        ipcRenderer.send('sell-card-confirmation', totalAmount);
    } else {
        alert('EL MONTO DEBE SER MAYOR A $0');
    }
};

function payWithCredit () {
    if(totalAmount != null && totalAmount != undefined && totalAmount != 0){
        const operation = 'pay';
        ipcRenderer.send('load-customer-list', {totalAmount, operation});
    } else {
        alert('EL MONTO DEBE SER MAYOR A $0');
    }
};

function newOrder () {
    if(totalAmount != null && totalAmount != undefined && totalAmount != 0){
        const operation = 'order';
        ipcRenderer.send('load-customer-list', {totalAmount, operation});
    } else {
        alert('EL MONTO DEBE SER MAYOR A $0');
    }
}; 
