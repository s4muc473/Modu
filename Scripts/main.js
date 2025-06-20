const typeLogo = `
███╗   ███╗ ██████╗ ██████╗ ██╗   ██╗
████╗ ████║██╔═══██╗██╔══██╗██║   ██║       
██╔████╔██║██║   ██║██║  ██║██║   ██║
██║╚██╔╝██║██║   ██║██║  ██║██║   ██║
██║ ╚═╝ ██║╚██████╔╝██████╔╝╚██████╔╝
╚═╝     ╚═╝ ╚═════╝ ╚═════╝  ╚═════╝ 
---> MODU PROJECTS ------------------
`;
console.log(typeLogo);

function hideLoading() {
    const loadings = document.getElementsByClassName("loading");
    if (loadings.length) {
        loadings[0].remove();
    }
}

function showScreenBlack() {
    const div = document.createElement("div");
    div.classList.add("loading","centralize")

    const label = document.createElement("label");
    label.innerText = "Carregando...";
    div.appendChild(label);

    document.body.appendChild(div);
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
    showFunds();
    showFinanceDates();

    if (localStorage.usuario) {
        nameUsuario.innerHTML = localStorage.usuario;
    } else {
        localStorage.usuario = "Usuario.";
        window.location.href = "/Pages/funds.html";
    }
});