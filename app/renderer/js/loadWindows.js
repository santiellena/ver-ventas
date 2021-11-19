document.getElementById('payment-button').addEventListener('click', () => {
    ipcRenderer.send('load-payment-window');
});
