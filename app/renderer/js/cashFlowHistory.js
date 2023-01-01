const ipcRenderer = window.app;
let state = 0;
const next = document.getElementById('next');
const prev = document.getElementById('prev');

async function onLoad () {
    const cashAmount = document.getElementById('cash-amount');
    const cash = await ipcRenderer.invoke('get-cash-cashRegister');

    cashAmount.innerText = `Dinero en Caja: $ ${cash}`;
};

onLoad();

prev.disabled = true;

function addList(list){
    const tbody = document.getElementById('tbody-cashFlow')
    tbody.innerHTML = '';
    for (const movement of list) {
        const tr = document.createElement('tr');
        tr.id = `tr${movement.id}`;
        const thDate = document.createElement('th');
        thDate.innerText = movement.date;
        const thAmount = document.createElement('th');
        thAmount.innerText = movement.amount;
        const thEmplooy = document.createElement('th');
        thEmplooy.innerText = movement.emplooy.name;
        const thOperation = document.createElement('th');
        thOperation.innerText = movement.operation;
        const thObservation = document.createElement('th');
        thObservation.innerText = movement.observation;
        const thCRegister = document.createElement('th');
        thCRegister.innerText = movement.cashRegister.id;
        

        tr.appendChild(thDate);
        tr.appendChild(thAmount);
        tr.appendChild(thEmplooy);
        tr.appendChild(thOperation);
        tr.appendChild(thObservation);
        tr.appendChild(thCRegister);

        tbody.appendChild(tr);
    };
};

async function bringNewList(state){
    const newList = await ipcRenderer.invoke('movements-history-change', state);
    addList(newList);
    const label = document.getElementById('label-pag');
    label.innerText = `Página ${state + 1}`;
};

next.addEventListener('click', async () => {
    state++;
    await bringNewList(state);
    prev.disabled = false;
});

prev.addEventListener('click', async () => {
    if(state != 0){
        state--;
        prev.disabled = false;
        if(state == 0){
            prev.disabled = true;
        };
        await bringNewList(state);
    } else {
        prev.disabled = true;
    }
});

async function resetList() {
    await bringNewList(0);
    const label = document.getElementById('label-pag');
    label.innerText = `Página 1`;
    next.disabled = false;
};
