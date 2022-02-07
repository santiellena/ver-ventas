document.getElementById('payment-button').addEventListener('click', () => {
    const totalAmount = document.getElementById('total-amount').value;
    const articlesQuantity = getAllItemSession().length;
    const dataSell = {
        totalAmount,
        articlesQuantity,
    }
    ipcRenderer.send('load-payment-window', dataSell);
});

document.getElementById('search-product-button').addEventListener('click', () => {
    ipcRenderer.send('load-search-products-window');
});

document.getElementById('fullscreen-button').addEventListener('click', () => {
    ipcRenderer.send('fullscreen-mainwindow');
});