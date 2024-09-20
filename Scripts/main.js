const typeLogo =  `
███╗   ███╗ ██████╗ ██████╗ ██╗   ██╗
████╗ ████║██╔═══██╗██╔══██╗██║   ██║       
██╔████╔██║██║   ██║██║  ██║██║   ██║
██║╚██╔╝██║██║   ██║██║  ██║██║   ██║
██║ ╚═╝ ██║╚██████╔╝██████╔╝╚██████╔╝
╚═╝     ╚═╝ ╚═════╝ ╚═════╝  ╚═════╝ 
---> MODU SEEDTECH ------------------
`;
console.log(typeLogo);

function logout() {
    firebase.auth().signOut().then(()=>{
        window.location.href="login.html";
    }).catch(()=>{
        alert("erro ao fazer logout");
    })
}

// Janelas e Divisões do Sistema
const containerParent = document.querySelector(".container-parent");
const containerPerfil = document.querySelector(".container-perfil");
const sectionControls = document.querySelector(".section-controls");



// Carregando informações do usuario e sistemas iniciais
const nameUsuario = document.querySelector("#name-usuario");
window.addEventListener('load', () => {
        showFunds();
        showFinanceDates();
        
        if (localStorage.usuario) {
            nameUsuario.innerHTML = localStorage.usuario;
        } else {
            localStorage.usuario = "Usuario.";
            nameUsuario.innerHTML = localStorage.usuario;
            window.location.href="/Pages/login.html";
        }
});