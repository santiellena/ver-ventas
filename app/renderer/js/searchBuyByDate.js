async function searchBuyByDate () {
    const fromDate = document.getElementById('from-date').value;
    const toDate = document.getElementById('to-date').value;

    if(fromDate != '' && toDate != ''){
    const buysByDate = await ipcRenderer.invoke('search-buys-by-date', {
        from:fromDate,
        to: toDate,
    });

    const tbodyBuys = document.getElementById('tbody-buys');

    const arrBuysByDate = Object.entries(buysByDate);

    let allBuys = '';

    arrBuysByDate.map(buy => {
        allBuys = allBuys + `<tr>
        <th>${buy[1].id}</th> 
        <th>${buy[1].date}</th>
        <th>$ ${buy[1].amount}</th>
        <th>${buy[1].emplooy.name}</th>
        <th>${buy[1].branch}</th>
        <th>${buy[1].supplier.name}</th>
        <th>${buy[1].howPaid}</th>
        <th><button class="btn btn-info" onclick="seeBuyDetail(${buy[1].id})">Ver</button></th>
      </tr>`
    });

    //Buy: 1-0 ID , 1-1 Date , 1-2 Amount , 1-3 Emplooy , 1-4 Branch , 1-5 Supplier, 1-6 HowPaid, 1-7 Details

    tbodyBuys.innerHTML = allBuys;
}
}