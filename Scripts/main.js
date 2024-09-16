const typeLogo =  `
███╗   ███╗ ██████╗ ██████╗ ██╗   ██╗
████╗ ████║██╔═══██╗██╔══██╗██║   ██║       
██╔████╔██║██║   ██║██║  ██║██║   ██║
██║╚██╔╝██║██║   ██║██║  ██║██║   ██║
██║ ╚═╝ ██║╚██████╔╝██████╔╝╚██████╔╝
╚═╝     ╚═╝ ╚═════╝ ╚═════╝  ╚═════╝ 
---> MODU v2.5 ----------------------
`;
console.log(typeLogo);

// Janelas e Divisões do Sistema
const containerParent = document.querySelector(".container-parent");
const containerPerfil = document.querySelector(".container-perfil");
const sectionHistory = document.querySelector(".section-history");
const sectionControls = document.querySelector(".section-controls");
const sectionFunds = document.querySelector(".section-funds");
const sectionNewFund = document.querySelector(".section-new-fund");

// Carregando informações do usuario e sistemas iniciais
const nameUsuario = document.querySelector("#name-usuario");
window.addEventListener('load', () => {
        showFunds();
        showMoviment();
        loadAnotations();
        showFinanceDates();
        
        if (localStorage.usuario) {
            nameUsuario.innerHTML = localStorage.usuario;
        } else {
            localStorage.usuario = "Usuario.";
            nameUsuario.innerHTML = localStorage.usuario;
        }
});

// Sistema de limpeza de dados
const btnDeletaDados = document.querySelector("#btn-delete");
btnDeletaDados.addEventListener('click', () => {
    localStorage.funds = [];
    localStorage.cards = [];
    localStorage.removeItem('financeOfDates');
    location.reload();
});

// Elementos da SectionFunds
const inputMotivo = document.querySelector("#input-movimento-motivo");
const inputValor = document.querySelector("#input-movimento-valor");
const btnDeposito = document.querySelector("#btn-deposito");
const btnRetirada = document.querySelector("#btn-retirar");
const btnVoltar = document.querySelector("#btn-voltar");
const btnDeletarFundo = document.querySelector("#btn-delete-fund");

// Chaves de acesso do localDtorage
const localStorageFundsKey = "funds";
const localStorageFunds = JSON.parse(localStorage.getItem(localStorageFundsKey) || "[]");

// Carregamento dos Funds
const localFunds = document.querySelector(".local-funds");
// Caixa do Fund
const containerFund = document.querySelector(".container-fund")
// Elementos de Criação do Fund
const btnNewFund = document.querySelector("#btn-new-fund");
const inputNameFund = document.querySelector("#input-name-fund");
const inputMetaFund = document.querySelector("#input-meta-fund");
const btnAddFund = document.querySelector("#btn-add-fund");

// Elementos do Fund
let saldoOfFund = document.querySelector("#saldoOfFund");
let nameOfFund = document.querySelector("#nameOfFund");
let metaOfFund = document.querySelector("#metaOfFund");

// Abrindo a caixa de criaçao de fund
btnNewFund.addEventListener("click",function(){
    sectionNewFund.style.display = "block";
    sectionFunds.style.display = "none";
});

// Criando novo fund
btnAddFund.addEventListener("click",function(){
    newFund("new");
});

// Carregando Funds
function showFunds() {
    containerFund.style.display = "none";
    containerParent.style.display = "block";

    localFunds.innerHTML = "";
    for (let iterador = 0;iterador < localStorageFunds.length;iterador++) {
        let nameFund = document.createElement('p');
        let saldoFundBox = document.createElement('h3');
        let saldoFund = document.createElement('p');
        let metaFundBox = document.createElement('h5');
        let metaFund = document.createElement('p');
        let fundBox = document.createElement('div');

        fundBox.setAttribute('class','fundBox');
        
        nameFund.setAttribute('id','nameFund');
        nameFund.textContent = localStorageFunds[iterador]['name'];

        saldoFundBox.textContent = "R$ ";
        saldoFund.setAttribute('id','saldoFund');
        saldoFund.textContent = parseFloat(localStorageFunds[iterador]['saldo']).toFixed(2);

        metaFundBox.textContent = "R$ ";
        metaFund.setAttribute('id','metaFund');
        metaFund.textContent = parseFloat(localStorageFunds[iterador]['meta']).toFixed(2);

        
        // Abrindo fund
        fundBox.addEventListener("click",function(){
            let name = nameFund.textContent;
            let saldo = Number(saldoFund.textContent);
            let meta = metaFund.textContent;
            containerFund.style.display = "block";
            containerParent.style.display = "none";
            openFundBox(name,saldo,meta);
        });

        let btnRemoveFund = document.createElement('button');
        btnRemoveFund.setAttribute('class','btn-basic');
        btnRemoveFund.textContent = "Deletar"; 

        // Deletando Fund
        btnRemoveFund.addEventListener("click",function(){
            let identificador = nameFund.textContent;
            console.log(identificador)

            // Excluindo cards do fund
            cards = cards.filter(function(name){
                return name['fundo'] !== identificador;
            });

            localStorage.setItem("cards", JSON.stringify(cards));
            showMoviment();
            removeFund(identificador);
        });

        // Adicionando elementos
        localFunds.appendChild(fundBox);
        fundBox.appendChild(nameFund);
        fundBox.appendChild(saldoFundBox);
        saldoFundBox.appendChild(saldoFund)
        fundBox.appendChild(metaFundBox);
        metaFundBox.appendChild(metaFund);
    }
}

// Função abrindo fundo
function openFundBox(name,saldo,meta) {
    nameOfFund.textContent = name;
    saldoOfFund.textContent = parseFloat(saldo).toFixed(2);
    metaOfFund.textContent = meta;
}

// F: excluindo fundo
function removeFund(name) {
    let index = localStorageFunds.findIndex(x => x.name == name);
    localStorageFunds.splice(index, 1);
    localStorage.setItem(localStorageFundsKey, JSON.stringify(localStorageFunds));
    showFunds();
}

// Crindo novo fundo
function newFund(use) {
    let nameFund, metaFund, saldoFund;
    if (inputNameFund.value == "" && use == "new") {
        alert("Insira o nome do Fundo");
    } else {
        // Criando novo fundo
        if (use == "new") {
            nameFund = inputNameFund.value;
            metaFund = inputMetaFund.value;
            saldoFund = 0;
        // Fechando fundo acessado
        } else if (use == "use") {
            nameFund = nameOfFund.textContent;
            metaFund = metaOfFund.textContent;
            saldoFund = saldoOfFund.textContent;
        }
        // Salvando dados do fund
        localStorageFunds.push({
            name: nameFund,
            meta: metaFund,
            saldo: saldoFund,
        });
        localStorage.setItem(localStorageFundsKey, JSON.stringify(localStorageFunds));
        inputMetaFund.value = inputNameFund.value = "";
        sectionNewFund.style.display = "none";
        sectionFunds.style.display = "block";

        showFunds();
    }
}

// Sistema de controle de entradas e saidas dos funds
btnDeposito.addEventListener('click', () => {
    if (inputValor.value == "") {
        alert("Informe o Valor")
    } else {
        let saldo = Number(saldoOfFund.textContent);
        let fund = nameOfFund.textContent;
        saldo += Number(inputValor.value);
        saldoOfFund.innerHTML = saldo;

        removeFund(fund);
        newFund("use");
        dataCalculation("prohibited");

        let tipo = "#E3B505";
        localStorage.tipo = tipo;

        saveMoviment();
    }
});

btnRetirada.addEventListener('click', () => {
    if (inputValor.value == "") {
        alert("Informe o Valor")
    } else {
        let saldo = Number(saldoOfFund.textContent);
        let fund = nameOfFund.textContent;
        saldo -= Number(inputValor.value);
        saldoOfFund.innerHTML = saldo;
    
        removeFund(fund);
        newFund("use");
        dataCalculation("exit");

        let tipo = "#dadacfc7";
        localStorage.tipo = tipo;

        saveMoviment();
    }
});

// Fechando fund
btnVoltar.addEventListener("click",() => {
    newFund("use");
});

btnDeletarFundo.addEventListener("click",function(){
    let fund = nameOfFund.textContent;

    cards = cards.filter(function(name){
        return name['fundo'] !== fund;
    });

    localStorage.setItem("cards", JSON.stringify(cards));

    removeFund(fund);
});

// Sistema de Datas - Pegando a data atual
const dataAtual = new Date();
const mesDoAno = dataAtual.getMonth() + 1;
const diaDoMes = dataAtual.getDate();
let diaFormatado = diaDoMes < 10 ? '0' + diaDoMes : diaDoMes;
let mesFormatado = mesDoAno < 10 ? '0' + mesDoAno : mesDoAno; 7
let dataFormatadaFinal = diaFormatado + '/' + mesFormatado;

// SISTEMA DE MOVIMENTAÇÕES

// Acessando cards de movimento na localStorage
let cards = JSON.parse(localStorage.getItem("cards") || "[]").reverse();

// F: salvando movimentação
function saveMoviment() {
    cards.unshift({
        tipo: localStorage.tipo,
        fundo: nameOfFund.textContent,
        motivo: inputMotivo.value,
        valor: Number(inputValor.value),
        data: dataFormatadaFinal,
    });
    localStorage.setItem("cards", JSON.stringify(cards));
    showMoviment();
}

// Carregando movimentação no historico
function showMoviment() {
    if (cards == '' || cards == 'undefined') {
        sectionHistory.innerHTML = '<div style="margin-bottom: 2vh;">Nenhuma Movimentação realizada.</div>';
    } else {
        sectionHistory.innerHTML = '<h3  style="margin-bottom: 2vh;">Movimentação Financeira</h3>';
    }

    for (let iterador = 0; iterador < cards.length; iterador++) {
        let content = document.createElement('div');
        let nameAndDateBox = document.createElement('div');
        let nameFund = document.createElement('h4');
        let valorBox = document.createElement('h3');
        let valor = document.createElement('p');
        let motivo = document.createElement('p');
        let data = document.createElement('p');

        content.setAttribute('class','content');
        content.style.backgroundColor = cards[iterador]['tipo'];

        nameFund.setAttribute('id','nameFundOfMoviment');
        nameFund.textContent = cards[iterador]['fundo'];

        data.setAttribute('id','dateOfMoviment')
        data.textContent = cards[iterador]['data'];

        valorBox.textContent = "R$ ";
        valor.setAttribute('id','valorOfMoviment');
        valor.textContent = parseFloat(cards[iterador]['valor']).toFixed(2);

        motivo.setAttribute('id','causeMoviment');
        motivo.textContent = cards[iterador]['motivo'];

        sectionHistory.appendChild(content);
        content.appendChild(nameAndDateBox);
        nameAndDateBox.appendChild(nameFund);
        nameAndDateBox.appendChild(data);
        content.appendChild(valorBox);
        valorBox.appendChild(valor);
        content.appendChild(motivo);
    }
}

// Sistema de anotações
const textAnotations = document.querySelector(".anotations");
function saveAnotation() {
    localStorage.anotation = textAnotations.value;
}

function autoSave() {
    setInterval(saveAnotation, 100);
}

function loadAnotations() {
    if (localStorage.anotation) {
        textAnotations.value = localStorage.anotation;
    } else {
        textAnotations.value = "";
    }
}

autoSave();

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
