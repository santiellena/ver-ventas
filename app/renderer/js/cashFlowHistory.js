const ipcRenderer = window.app;

async function onLoad () {
    const cashAmount = document.getElementById('cash-amount');
    const cash = await ipcRenderer.invoke('get-cash-cashRegister');

    cashAmount.innerText = `Dinero en Caja: $ ${cash}`;
};

onLoad();