document.getElementById('fullscreen-button').addEventListener('click', () => {
    ipcRenderer.send('fullscreen-mainwindow', ''); 
});

document.getElementById('logout-button-footer').addEventListener('click', () => {
    ipcRenderer.send('logout', '');
    window.close();
});