async function searchByDate() {
    const tbody = document.getElementById('tbody-orders');
    document.getElementById('tbody-details').innerHTML = '';
    const from = document.getElementById('from-date').value;
    const to = document.getElementById('to-date').value;
     if(from != '' && from != undefined && from != null && to != '' && to != undefined && to != null){
        const ordersByDate = await ipcRenderer.invoke('get-orders-bydate', {from, to});
        if(ordersByDate.length == 0){
            tbody.innerHTML = '';
            const trAlert = document.createElement('tr');
            trAlert.setAttribute('class', 'odd');
            trAlert.setAttribute('id', 'tr-alert');
            const tdAlert = document.createElement('td');
            tdAlert.setAttribute('valign', 'top');
            tdAlert.setAttribute('colspan', '7');
            tdAlert.setAttribute('class', 'dataTables_empty');
            tdAlert.innerText = 'Busqueda sin recursos encontrados';
            trAlert.appendChild(tdAlert);

            tbody.appendChild(trAlert);
        } else {
            tbody.innerHTML = '';
            let ordersToInner = '';
            ordersByDate.map(e => {
                ordersToInner = ordersToInner + `
                <tr>
                    <th>${e.id}</th>
                    <th>${e.date}</th>
                    <th>$ ${e.amount}</th>
                    <th>${e.customer}</th>
                    <th>${e.branch}</th>
                    <th><button class="btn btn-info" onclick="seeOrderDetails(${e.id})">Ver</button></th>
                </tr>`
            });
            tbody.innerHTML = ordersToInner;
        }
        
     }

};

async function resetList() {
    const orders = await ipcRenderer.invoke('get-orders');
    const tbody = document.getElementById('tbody-orders');
    const ordersIterable = Object.values(orders);
    document.getElementById('tbody-details').innerHTML = '';
    let allOrders = '';
    ordersIterable.map(order => {
        allOrders = allOrders + `
        <tr>
            <th>${order.id}</th> 
            <th>${order.date}</th>
            <th>$ ${order.amount}</th>
            <th>${order.customer}</th>
            <th>${order.branch}</th>
            <th><button class="btn btn-info" onclick="seeOrderDetails(${order.id})">Ver</button></th>
        </tr>
        `
    });

    tbody.innerHTML = allOrders;
}