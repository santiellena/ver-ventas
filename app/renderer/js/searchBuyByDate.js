async function searchBuyByDate () {
    const fromDate = document.getElementById('from-date').value;
    const toDate = document.getElementById('to-date').value;

    if(fromDate != '' && toDate != ''){
    const buysByDate = await ipcRenderer.invoke('search-buys-by-date', {
        from:fromDate,
        to: toDate,
    });

    const tbodyBuys = document.getElementById('tbody-buys');

    let allBuys = '';

    for(const buy  of buysByDate){
        allBuys = allBuys + `<tr>
        <th>${buy.id}</th> 
        <th>${buy.date}</th>
        <th>$ ${buy.totalAmount}</th>
        <th>${buy.user.emplooy.name}</th>
        <th>${buy.branch.name}</th>
        <th>${buy.supplier.person.name}</th>
        <th>${buy.howPaid}</th>
        <th><button class="btn btn-info" onclick="seeBuyDetail(${buy.id})">Ver</button></th>
      </tr>`
    };

    //Buy: 1-0 ID , 1-1 Date , 1-2 Amount , 1-3 Emplooy , 1-4 Branch , 1-5 Supplier, 1-6 HowPaid, 1-7 Details

    tbodyBuys.innerHTML = allBuys;
}
}