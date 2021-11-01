const ipcRenderer = window.app;

const loadIndex = () => {
    ipcRenderer.send('load-index', '');
}

document.getElementById('nav-main-logo').addEventListener('click', () => {
    loadIndex();
});