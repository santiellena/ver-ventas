async function searchByDate () {
    const fromDate = document.getElementById('from-date').value;
    const toDate = document.getElementById('to-date').value;

    if(fromDate != '' && toDate != ''){
    const sellsByDate = await ipcRenderer.invoke('search-sells-by-date', {
        fromDate,
        toDate,
    });

    const tbody = document.getElementById('tbody-sells');

    tbody.innerHTML = '';
        for (const sell of sellsByDate) {
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
        const label = document.getElementById('label-pag');
    label.innerText = `Página de búsqueda`;
};
};