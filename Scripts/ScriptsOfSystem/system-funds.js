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
const sectionNewFund = document.querySelector(".section-new-fund");
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
};

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
    let fund = nameOfFund.textContent;
    removeFund(fund);
    newFund("use");
});

btnDeletarFundo.addEventListener("click",function(){

    cards = cards.filter(function(name){
        return name['fundo'] !== fund;
    });

    localStorage.setItem("cards", JSON.stringify(cards));

    removeFund(fund);
});
