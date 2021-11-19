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
        <th>${sell[1][0]}</th> 
        <th>${sell[1][1]}</th>
        <th>${sell[1][2]}</th>
        <th>${sell[1][3]}</th>
        <th>${sell[1][4]}</th>
        <th>${sell[1][5]}</th>
        <th><button class="btn btn-info" onclick="seeDetail(${sell[1][0]})">Ver</button></th>
      </tr>`
    });

    //Order: 1-0 ID , 1-1 Date , 1-2 Amount , 1-3 Customer , 1-4 Branch , 1-5 HowPaid...

    tbodySells.innerHTML = allSells;
}
}

