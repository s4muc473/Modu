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
const sectionHistory = document.querySelector(".section-history");
const sectionControls = document.querySelector(".section-controls");
const sectionFunds = document.querySelector(".section-funds");

// Carregando informações do usuario e sistemas iniciais
const nameUsuario = document.querySelector("#name-usuario");
window.addEventListener('load', () => {
        // MAIN ENGINE
        
        if (localStorage.usuario) {
            nameUsuario.innerHTML = localStorage.usuario;
        } else {
            localStorage.usuario = "Usuario.";
            nameUsuario.innerHTML = localStorage.usuario;
            window.location.href="/Pages/login.html";
        }
});