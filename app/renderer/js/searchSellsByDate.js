async function searchByDate () {
    const fromDate = document.getElementById('from-date').value;
    const toDate = document.getElementById('to-date').value;

    if(fromDate != '' && toDate != ''){
    const sellsByDate = await ipcRenderer.invoke('search-sells-by-date', {
        fromDate,
        toDate,
    });

    const tbodySells = document.getElementById('tbody-sells');

    const arrSellsByDate = Object.entries(sellsByDate);

    let allSells = '';

    arrSellsByDate.map(sell => {
        allSells = allSells + `<tr>
        <th>${sell[1].id}</th> 
        <th>${sell[1].date}</th>
        <th>${sell[1].amount}</th>
        <th>${sell[1].customer}</th>
        <th>${sell[1].emplooy}</th>
        <th>${sell[1].branch}</th>
        <th>${sell[1].howPaid}</th>
        <th><button class="btn btn-info" onclick="seeDetail(${sell[1].id})">Ver</button></th>
      </tr>`
    });

    //Order: 1-0 ID , 1-1 Date , 1-2 Amount , 1-3 Customer , 1-4 Branch , 1-5 HowPaid...

    tbodySells.innerHTML = allSells;
}
}

