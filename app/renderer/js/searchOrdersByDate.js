async function searchByDate() {
    const tbody = document.getElementById('tbody-orders');
    document.getElementById('tbody-details').innerHTML = '';
    const from = document.getElementById('from-date').value;
    const to = document.getElementById('to-date').value;
    const thead = document.getElementById('thead-orders');
    thead.innerHTML = `
    <tr>
                          <th class=",select_filter">ID</th>
                          <th>Fecha</th>
                          <th>Total</th>
                          <th>Cliente</th>
                          <th>Empleado</th>
                          <th>Sucursal</th>
                          <th>Lista de Precios</th>
                          <th>Opciones</th>
                        </tr>`
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
                let list = e.priceList == 'public' ? 'Público' : 'Mayorista';
                ordersToInner = ordersToInner + `
                <tr id="tr${e.id}">
                    <th>${e.id}</th>
                    <th>${e.date}</th>
                    <th>$ ${e.amount}</th>
                    <th>${e.customer.name}</th>
                    <th>${e.emplooy.name}</th>
                    <th>${e.branch}</th>
                    <th>${list}</th>
                    <th>
                    <button class="btn btn-info" onclick="seeOrderDetails(${e.id})">Detalles</button>
                            <button class="btn btn-danger" onclick="deleteOrder(${e.id})"><i class="fa fa-trash"></i></button>
                            <button class="btn btn-success" onclick="addSell(${e.id});">Concretar Venta</button>
                    </th>
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
    const thead = document.getElementById('thead-orders');
    thead.innerHTML = `
    <tr>
                          <th class=",select_filter">ID</th>
                          <th>Fecha</th>
                          <th>Total</th>
                          <th>Cliente</th>
                          <th>Empleado</th>
                          <th>Sucursal</th>
                          <th>Lista de Precios</th>
                          <th>Opciones</th>
                        </tr>`
    document.getElementById('tbody-details').innerHTML = '';
    let allOrders = '';
    ordersIterable.map(order => {
        let list = order.priceList == 'public' ? 'Público' : 'Mayorista';
        allOrders = allOrders + `
        <tr id="tr${order.id}">
            <th>${order.id}</th> 
            <th>${order.date}</th>
            <th>$ ${order.amount}</th>
            <th>${order.customer.name}</th>
            <th>${order.emplooy.name}</th>
            <th>${order.branch}</th>
            <th>${list}</th>
            <th>
                <button class="btn btn-info" onclick="seeOrderDetails(${order.id})">Detalles</button>
                <button class="btn btn-danger" onclick="deleteOrder(${order.id})"><i class="fa fa-trash"></i></button>
                <button class="btn btn-success" onclick="addSell(${order.id});">Concretar Venta</button>
            </th>
        </tr>
        `
    });

    tbody.innerHTML = allOrders;
}