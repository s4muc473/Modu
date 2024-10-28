if ('serviceWorker' in navigator) {
    console.log('rodou')
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/template/sw.js')
        .then((register) =>{
            console.log('App Registrado SW',register)
        })
        .catch((erro) => {
            console.log(erro)
        })
    });
}