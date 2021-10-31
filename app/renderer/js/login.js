const ipcRenderer = window.app;

document.getElementById('button-login').addEventListener('click', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
   
    if(username != null && username != undefined && password != null && password != undefined){
        const answer = await ipcRenderer.invoke('login', {
            username,
            password,
        });

        answer ? window.close() : alert('Datos ingresados incorrectos');
        
        
    } else {
        alert('debe introducir datos')
    }
});
