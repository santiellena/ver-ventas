let state = 0;
const next = document.getElementById('next');
const prev = document.getElementById('prev');
prev.disabled = true;
const tbody = document.getElementById('tbody-sells');

function addList(list){
    tbody.innerHTML = '';
    for (const sell of list) {
        const tr = document.createElement('tr');
        tr.id = `tr${sell.id}`;
        const thId = document.createElement('th');
        thId.style = 'padding: 0.3rem;'
        thId.innerText = sell.id;
        const thDate = document.createElement('th');
        thDate.style = 'padding: 0.3rem;'
        thDate.innerText = sell.date;
        const thAmount = document.createElement('th');
        thAmount.style = 'padding: 0.3rem;'
        thAmount.innerText = sell.totalAmount;
        const thCustomer = document.createElement('th');
        thCustomer.style = 'padding: 0.3rem;'
        thCustomer.innerText = sell.customer.person.name;
        const thHowPaid = document.createElement('th');
        thHowPaid.style = 'padding: 0.3rem;'
        thHowPaid.innerText = sell.howPaid;
        const thButtons = document.createElement('th');
        thButtons.style = 'padding: 0.3rem;'
        thButtons.innerHTML = `<button style="margin-top: 0; margin-bottom: 0" class="btn btn-info"
         onclick="seeDetail({{this.id}})">Detalles</button>
        <button style="margin-top: 0; margin-bottom: 0" class="btn btn-danger" 
        onclick="deleteSell({{this.id}})">
        <i class="fa fa-trash"></i></button>`;

        tr.appendChild(thId);
        tr.appendChild(thDate);
        tr.appendChild(thAmount);
        tr.appendChild(thCustomer);
        tr.appendChild(thHowPaid);
        tr.appendChild(thButtons);

        tbody.appendChild(tr);
    };
};

async function bringNewList(state){
    const newList = await ipcRenderer.invoke('sell-history-change', state);
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
    const fromDate = document.getElementById('from-date');
    const toDate = document.getElementById('to-date');
    fromDate.value = undefined;
    toDate.value = undefined;
    const label = document.getElementById('label-pag');
    label.innerText = `Página 1`;
};