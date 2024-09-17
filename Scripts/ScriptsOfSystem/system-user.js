// SISTEMA DE PERFIL

// Editando nome do usuario
const inputNameUsuario = document.querySelector("#input-name-usuario");
const btnSaveDataProfile = document.querySelector("#btn-save-data-profile");
const btnEditProfile = document.querySelector("#btn-edit-profile");
btnEditProfile.addEventListener("click",()=>{
    inputNameUsuario.focus();
    inputNameUsuario.style.color = "#fff";
    btnEditProfile.style.display = "none";
    btnSaveDataProfile.style.display = "block";

});

btnSaveDataProfile.addEventListener("click",()=> {
    localStorage.usuario = inputNameUsuario.value;
    inputNameUsuario.innerHTML = localStorage.usuario;
    inputNameUsuario.style.color = "#000";
    location.reload();
});

// Estastisticas de Perfil
const boxOfProhibited = document.querySelector("#box-of-prohibited");
const boxOfExit = document.querySelector("#box-of-exit");
const boxOfBalance = document.querySelector("#box-of-balance");

let financeOfDates = {
    prohibited: 0,
    balance: 0,
    exit: 0,
}

localDate = JSON.parse(localStorage.getItem("financeOfDates") || JSON.stringify(financeOfDates));

function showFinanceDates() {
    boxOfBalance.innerHTML = `R$ ${localDate.balance},00`;
    boxOfProhibited.innerHTML = `R$ ${localDate.prohibited},00`;
    boxOfExit.innerHTML = `R$ ${localDate.exit},00`;
}

function dataCalculation(type) {
    let prohibited = localDate.prohibited;
    let balance = localDate.balance;
    let exit = localDate.exit;

    let valor = inputValor.value;

    if (type == "prohibited") {
        prohibited += Number(valor);
        console.log(prohibited)
        balance = prohibited - exit;

        localDate.prohibited = prohibited;
        localDate.balance = balance;

    } else if (type == "exit") {
        exit += Number(valor);
        balance = prohibited - exit;

        localDate.exit = exit;
        localDate.balance = balance;
    }
    localStorage.setItem("financeOfDates",JSON.stringify(localDate))

    boxOfBalance.innerHTML = `R$ ${balance},00`;
    boxOfProhibited.innerHTML = `R$ ${prohibited},00`;
    boxOfExit.innerHTML = `R$ ${exit},00`;
}

// F: abrindo e fechando container do perfil
function openContainerPerfil() {
    if (containerParent.style.display != "none") {
        containerParent.style.display = "none";
        containerPerfil.style.display = "block";

        if (localStorage.usuario == "Undefined" || localStorage.usuario == " ") {
            localStorage.usuario = "Usuario."
        } else {
            inputNameUsuario.value = localStorage.usuario + ".";
        }

    } else {
        location.reload();
    }
}

// Sistema de limpeza de dados
const btnDeletaDados = document.querySelector("#btn-delete");
btnDeletaDados.addEventListener('click', () => {
    localStorage.funds = [];
    localStorage.cards = [];
    localStorage.removeItem('financeOfDates');
    location.reload();
});
