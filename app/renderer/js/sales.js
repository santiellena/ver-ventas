const ipcRenderer = window.app;

function loadAddSaleWindow () {
    ipcRenderer.send('load-addsale-page');
};

ipcRenderer.on('load-new-sale', async () => {
    const sale = await ipcRenderer.invoke('get-new-sale');
    console.log(sale.productChange);
    if(sale){
        if(sale.productChange == 0){
            document.getElementById(`sale${sale.id}`).remove();
        };

        const divMain = document.createElement('div');
        divMain.setAttribute('class', 'col-md-3 col-sm-6');
        divMain.setAttribute('id', `sale${sale.id}`);

        divMain.innerHTML = `<div class="pricing">
        <div class="title">
          <h2>${sale.product.description}</h2>
          <h1>$ ${sale.discount}</h1>
          <span>${sale.fromDate}  -  ${sale.toDate}</span>
        </div>
        <div class="x_content">
          <div class="">
            <div class="pricing_features">
              <ul class="list-unstyled text-left">
                <li><i class="fa fa-check text-success"></i> <strong>Producto:</strong> ${sale.product.description}</li>
                <li><i class="fa fa-check text-success"></i> <strong>Precio:</strong> $ ${sale.product.unitPrice}</li>
                <li><i class="fa fa-check text-success"></i> <strong>Descuento:</strong> $ ${sale.discount}</li>
                <li><i class="fa fa-check text-success"></i> <strong>Fecha de inicio:</strong> ${sale.fromDate}</li>
                <li><i class="fa fa-check text-success"></i> <strong>Fecha de finalización:</strong> ${sale.toDate}</li>
              </ul>
            </div>
          </div>
          <div class="pricing_footer">
            <a href="javascript:void(0);" class="btn btn-danger btn-block" role="button" onclick="deleteSale(${sale.id});">Cancelar <span> Oferta!</span></a>
          </div>
        </div>
      </div>`;

      const contents = document.getElementById('contents');

      contents.insertAdjacentElement('beforeend', divMain);
        
    };
});

function clearAlert () {
    const alertDiv = document.getElementById('alert');
    alertDiv.innerHTML = '';
};

async function deleteSale (id) {
    if(id){
        const answer = await ipcRenderer.invoke('delete-sale', id);
        if(answer){
            document.getElementById(`sale${id}`).remove();
        } else {
            const divAlert = document.getElementById('alert');
            divAlert.innerHTML = '<div class="alert alert-danger alert-dismissible "  role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close" onclick="clearAlert();"><span aria-hidden="true">×</span></button><strong>Error!</strong> No se pudo eliminar la oferta</div>';
        };
    };
};

